import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt/token";
import { uploadToCloudinary } from "@/lib/cloudinary/cloudinary";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const take = searchParams.get("take")
        const seller = searchParams.get("seller")

        let config: any = {
            orderBy: { createdAt: "desc" }
        }

        if(take !== null) config = { ...config, take: Number(take) }
        if(seller !== null) {
            if(Number(seller) == 0) config = { ...config, where: { soldByPlatform: true } }
            else config = { ...config, where: { sellerId: Number(seller) } }
        }

        const data = await prisma.shirt.findMany(config)

        return NextResponse.json(
            {
                message: "Data fetched successfully.",
                data
            },
            { status: 200 }
        )
    } catch(err) {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        )
    }
}


export async function POST(req: NextRequest) {
    try {
        // Getting data
        const formData = await req.formData()
        const file = formData.get("file")
        const name = formData.get("name") as string
        const description = formData.get("description") as string
        const priceStr = formData.get("price") as string
        const price = priceStr ? parseFloat(priceStr) : null

        // Missing fields - 400
        if(!file || !name || !description || !price) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }


        // Uploading image to cloudinary
        const cloudinaryResponse = await uploadToCloudinary(file)
        if(!cloudinaryResponse.ok) {
            return NextResponse.json(
                { error: "Image upload failed. Please try again." },
                { status: 500 }
            )
        }
        
        const imageLink = (await cloudinaryResponse.json()).secure_url


        // Getting user
        const token = req.cookies.get("token")
        const payload = await verifyToken(token!.value, process.env.JWT_SECRET!)
        const sellerId = payload.userId as number


        // Creating Shirt
        const shirt = await prisma.shirt.create({
            data: { imageLink, name, description, price, sellerId }
        })

        if(!shirt) {
            throw new Error("Something went wrong.")
        }

        return NextResponse.json(
            { 
                message: "T-Shirt uploaded successfully.",
                shirtId: shirt.id
            },
            { status: 201 }
        )
    } catch(err) {
        console.error(err)
        return NextResponse.json(
            { error: err },
            { status: 500 }
        )
    }
}