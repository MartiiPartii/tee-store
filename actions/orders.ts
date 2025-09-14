import { getUserId } from "@/lib/jwt/token"
import { OrderDetailsInterface, OrderPreview } from "@/types/order"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const getMyOrders = async () => {
    const userId = await getUserId() as number

    let orders: OrderPreview[] = []
    let error: string | null = null
    try {
        if(!userId) throw new Error()
        orders = await prisma.order.findMany({
            where: { userId },
            select: {
                id: true,
                date: true,
                item: {
                    select: {
                        price: true
                    }
                }
            },
            orderBy: {
                date: "desc"
            }
        }) || []
    } catch(err) {
        error = "We couldn't fetch your orders. Please try again."
    }

    return { orders, error }
}

export const getOrder = async (id: number) => {
    const userId = await getUserId()

    let order: OrderDetailsInterface | null = null
    try {
        if(!userId) throw new Error()
        order = await prisma.order.findUnique({
            where: {
                id,
                userId: Number(userId)
            },
            select: {
                id: true,
                date: true,
                address: true,
                firstName: true,
                lastName: true,
                phone: true,
                itemSize: true,
                item: {
                    include: {
                        seller: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        })
    } catch(err) {
        notFound()
    }

    return order
}