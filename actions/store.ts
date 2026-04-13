"use server"

import { uploadToCloudinary } from "@/lib/cloudinary/cloudinary"
import { getUserId, verifyToken } from "@/lib/jwt/token"
import { logServerError } from "@/lib/logger"
import { prisma } from "@/lib/prisma"
import type { CatalogShirt } from "@/types/shirt"
import { ShirtOverview } from "@/types/shirt"
import type { Prisma } from "@/app/generated/prisma"
import {
  browsePriceWhere,
  browseShirtOrderBy,
  type BrowsePrice,
  type BrowseSort,
} from "@/lib/browse-params"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

const shirtCatalogInclude = {
    seller: { select: { firstName: true, lastName: true } },
} satisfies Prisma.ShirtInclude

function shirtCatalogWhereAndOrderBy({
    soldByPlatform,
    sellerId,
    searchQuery,
    sort,
    priceFilter,
}: {
    soldByPlatform?: boolean
    sellerId?: number
    searchQuery?: string
    sort?: BrowseSort
    priceFilter?: BrowsePrice
}): {
    where: Prisma.ShirtWhereInput | undefined
    orderBy: Prisma.ShirtOrderByWithRelationInput
} {
    const where: Prisma.ShirtWhereInput = {}

    if (soldByPlatform === true) {
        where.soldByPlatform = true
    } else if (soldByPlatform === false) {
        where.soldByPlatform = false
        if (sellerId != null) {
            where.sellerId = sellerId
        }
    }

    const priceClause = browsePriceWhere(priceFilter ?? "all")
    if (priceClause) {
        where.price = priceClause
    }

    if (searchQuery) {
        const words = searchQuery.split(" ")
        where.OR = [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            {
                seller: {
                    is: {
                        OR: words.map((word) => ({
                            OR: [
                                {
                                    firstName: {
                                        contains: word,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    lastName: {
                                        contains: word,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        })),
                    },
                },
            },
        ]
    }

    const orderBy = browseShirtOrderBy(sort ?? "newest")

    return {
        where: Object.keys(where).length ? where : undefined,
        orderBy,
    }
}

export const countShirts = async ({
    soldByPlatform,
    sellerId,
    searchQuery,
    priceFilter,
}: {
    soldByPlatform?: boolean
    sellerId?: number
    searchQuery?: string
    priceFilter?: BrowsePrice
}): Promise<number> => {
    const { where } = shirtCatalogWhereAndOrderBy({
        soldByPlatform,
        sellerId,
        searchQuery,
        sort: "newest",
        priceFilter,
    })
    return prisma.shirt.count({ where })
}

export const getShirts = async ({
    take,
    skip,
    soldByPlatform,
    sellerId,
    searchQuery,
    sort,
    priceFilter,
}: {
    take?: number
    skip?: number
    soldByPlatform?: boolean
    sellerId?: number
    searchQuery?: string
    sort?: BrowseSort
    priceFilter?: BrowsePrice
}): Promise<CatalogShirt[]> => {
    const { where, orderBy } = shirtCatalogWhereAndOrderBy({
        soldByPlatform,
        sellerId,
        searchQuery,
        sort,
        priceFilter,
    })

    return prisma.shirt.findMany({
        where,
        orderBy,
        include: shirtCatalogInclude,
        ...(skip != null && skip > 0 ? { skip } : {}),
        ...(take != null ? { take } : {}),
    })
}

export const getMyShirts = async () => {
    const userId = await getUserId() as number

    let shirts: ShirtOverview[] | null = []
    let totalSales: number = 0
    let totalRevenue: number = 0
    let error: string | null = null
    try {
        if(!userId) throw new Error()
        shirts = await prisma.shirt.findMany({
            where: { sellerId: userId },
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                imageLink: true,
                name: true,
                description: true,
                price: true,
                _count: {
                    select: {
                        orders: true
                    }
                }
            }
        })
        shirts = shirts.map(shirt => {
            const revenue = shirt.price * shirt._count.orders
            totalRevenue += revenue
            return {
                ...shirt,
                revenue
            }
        })
        if(shirts && shirts.length) {
            const saleCounts = shirts.map(shirt => shirt._count.orders)
            totalSales = saleCounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        }
    } catch (err) {
        logServerError("store:get_my_shirts_failed", err, { userId })
        error = "We couldn't fetch your products properly. Please try again."
    }

    return { shirts, totalSales, totalRevenue, error }
}

export const getShirt = async (
    b64id: string
): Promise<{ shirt: CatalogShirt | null }> => {
    let shirt: CatalogShirt | null = null
    try {
        const id = atob(b64id)
        shirt = await prisma.shirt.findUnique({
            where: { id: Number(id) },
            include: shirtCatalogInclude,
        })
    } catch (err) {
        logServerError("store:get_shirt_failed", err, { b64id })
        notFound()
    }

    return { shirt }
}

/** Other listings in the same channel (studio vs community), newest first. */
export const getSimilarShirts = async ({
    excludeId,
    soldByPlatform,
    take = 15,
}: {
    excludeId: number
    soldByPlatform: boolean
    take?: number
}): Promise<CatalogShirt[]> => {
    return prisma.shirt.findMany({
        where: {
            id: { not: excludeId },
            soldByPlatform,
        },
        orderBy: { createdAt: "desc" },
        take,
        include: shirtCatalogInclude,
    })
}

export const uploadShirt = async (previousState: any, formData: FormData, file: File | null) => {
    try {
        const name = formData.get("name") as string
        const description = formData.get("description") as string
        const priceStr = formData.get("price") as string
        const price = priceStr ? parseFloat(priceStr) : null

        // Missing fields - 400
        if(!file || !name || !description || !price) return {
            error: "All fields are required"
        }



        // Uploading image to cloudinary
        const cloudinaryResponse = await uploadToCloudinary(file)
        if(!cloudinaryResponse.ok) {
            return {
                error: "Image upload failed. Please try again."
            }
        }
        
        const imageLink = (await cloudinaryResponse.json()).secure_url


        // Getting user
        const sellerId = await getUserId() as number


        // Creating Shirt
        const shirt = await prisma.shirt.create({
            data: { imageLink, name, description, price, sellerId }
        })

        if(!shirt) {
            throw new Error("Something went wrong.")
        }

    } catch (err) {
        logServerError("store:upload_shirt_failed", err)
        return {
            error: "We couldn't upload your product. Please try again"
        }
    }
    redirect("/profile/my-shirts")
}