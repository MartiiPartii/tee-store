export interface OrderPreview {
    id: number,
    date: Date,
    item: {
        price: number
    }
}