import SectionContainer from "@/app/components/SectionContainer"
import { getUserId } from "@/lib/jwt/token"
import { OrderPreview } from "@/types/order"
import { Stack, Typography } from "@mui/material"
import { prisma } from "@/lib/prisma"
import OrderListCard from "@/app/components/OrderListCard"

const Orders = async () => {
    const userId = await getUserId() as number

    let orders: OrderPreview[] | null = null
    try {
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
        })

        console.log(orders)
    } catch(err) {

    }


    return (
        <SectionContainer
            props={{
                sx: {
                    py: 12
                }
            }}
        >
            <Typography variant="h2" mb={1}>My Orders</Typography>
            <Typography variant="body1" mb={2}>Track your order history</Typography>

            <Stack gap={2}>
                {
                    orders && orders.length > 0 &&
                    orders.map((order, i) => (
                        <OrderListCard
                            key={i}
                            order={order}
                        />
                    ))
                }
            </Stack>
        </SectionContainer>
    )
}

export default Orders