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