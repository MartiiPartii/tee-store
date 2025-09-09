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