export interface UserShippingInfo {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string
}

export interface ProductOverview {
    name: string,
    id: number,
    imageLink: string,
    price: number,
    seller: {
        firstName: string,
        lastName: string
    } | null,
    soldByPlatform: boolean,
}