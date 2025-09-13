import { Shirt } from "@/app/generated/prisma"
import { ProductOverview } from "./shipping"

export interface OrderPreview {
    id: number,
    date: Date,
    item: {
        price: number
    }
}

export interface OrderDetailsInterface {
    id: number,
    date: Date,
    address: string,
    firstName: string,
    lastName: string,
    phone: string,
    itemSize: string,
    item: Shirt & { 
        seller: {
            firstName: string,
            lastName: string
        } | null
    }
}