"use server"

import { uploadToCloudinary } from "@/lib/cloudinary/cloudinary"
import { getUserId, verifyToken } from "@/lib/jwt/token"
import { prisma } from "@/lib/prisma"
import { ShirtOverview } from "@/types/shirt"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export const getShirts = async ({ take, soldByPlatform, sellerId, searchQuery } : {
    take?: number,
    soldByPlatform?: boolean,
    sellerId?: number,
    searchQuery?: string
}) => {
    let config: any = {
        orderBy: { createdAt: "desc" }
    }

    
    if(take) config = { ...config, take: take }
    if(soldByPlatform) config = { ...config, where: { soldByPlatform: true } }
    if(soldByPlatform == false) {
        config = { ...config, where: { soldByPlatform: false } }
        if(sellerId) {
            config = { ...config, where: { ...config.where, sellerId } }
        }
    }
    if(searchQuery) {
        const words = searchQuery.split(" ")

        config = {
            ...config,
            where: {
                ...config.where,
                OR: [
                { name: { contains: searchQuery, mode: "insensitive" } },
                { description: { contains: searchQuery, mode: "insensitive" } },
                    {
                        seller: {
                            is: {
                                OR: words.map(word => ({
                                    OR: [
                                        { firstName: { contains: word, mode: "insensitive" } },
                                        { lastName: { contains: word, mode: "insensitive" } }
                                    ]
                                }))
                            }
                        }
                    }
                ]
            }
        }
    }
    
    const data = await prisma.shirt.findMany(config)

    return data
}

export const getMyShirts = async () => {
    const userId = await getUserId() as number

    let shirts: ShirtOverview[] | null = []
    let totalSales: number = 0
    let totalRevenue: number = 0
    let error: string | null = null
    try {
        if(!userId) throw new Error()
        shirts = await await prisma.shirt.findMany({
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
    } catch(err) {
        error = "We couldn't fetch your products properly. Please try again."
    }

    return { shirts, totalSales, totalRevenue, error }
}

export const getShirtSeller = async(sellerId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: sellerId },
        select: { firstName: true, lastName: true }
    })

    return user
}

export const getShirt = async (b64id: string) => {
    let shirt
    let user: { firstName: string, lastName: string } | null = null
    try {
        const id = atob(b64id)
        shirt = await prisma.shirt.findUnique({ where: { id: Number(id) } })

        if(shirt && !shirt.soldByPlatform) {
            const sellerId: number = shirt.sellerId!
            user = await getShirtSeller(sellerId)
        }
    } catch(err) {
        notFound()
    }

    return { shirt, user }
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

    } catch(err) { 
        return {
            error: "We couldn't upload your product. Please try again"
        }
    }
    redirect('/my-shirts')
}