import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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