import type { Prisma } from "@/app/generated/prisma"

/** Shirt row as returned by `getShirts` / `getShirt` (seller joined in one query). */
export type CatalogShirt = Prisma.ShirtGetPayload<{
  include: {
    seller: { select: { firstName: true; lastName: true } }
  }
}>

export interface Shirt {
    id: number,
    imageLink: string,
    name: string,
    description: string,
    price: number,
    sellerId: number | null,
    soldByPlatform: boolean,
    createdAt: string
}

export interface ShirtOverview {
    id: number,
    imageLink: string,
    name: string,
    description: string,
    price: number,
    revenue?: number,
    _count: {
        orders: number
    }
}