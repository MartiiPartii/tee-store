"use server"

import { Order } from "@/app/generated/prisma"
import { getUserId } from "@/lib/jwt/token"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export const purchase = async (prevState: any, formData: FormData) => {
    const userId = await getUserId()

    const itemId = formData.get("itemId") as string | null
    const itemSize = formData.get("itemSize") as string | null

    const firstName = formData.get("firstName") as string | null
    const lastName = formData.get("lastName") as string | null
    const address = formData.get("address") as string | null
    const phone = formData.get("phone") as string | null
    
    if(!itemId || !itemSize || !firstName || !lastName || !address || !phone) {
        return {
            error: "All fields are required."
        }
    }

    let order: Order | null
    try {
        order = await prisma.order.create({
            data: {
                firstName,
                lastName,
                address,
                phone,
                userId: Number(userId),
                itemId: Number(itemId),
                itemSize
            }
        })

        
        console.log(order)
    } catch(err) {
        console.error(err)
        return {
            error: "We couldn't create your order. Please try again."
        }
    }

    const b64id = btoa(String(order.id))
    redirect(`/orders/${b64id}`)
}