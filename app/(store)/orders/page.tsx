import SectionContainer from "@/app/components/SectionContainer"
import { Button, Stack, Typography } from "@mui/material"
import OrderListCard from "@/app/components/OrderListCard"
import { getMyOrders } from "@/actions/orders"
import Link from "next/link"

const Orders = async () => {
    const { error, orders } = await getMyOrders()


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

            {
                error ?
                <Typography variant="body1" color="error" fontStyle={"italic"}>{error}</Typography>
                :
                orders && orders.length > 0 ?
                <Stack gap={2}>
                    {
                        orders.map((order, i) => (
                            <OrderListCard
                                key={i}
                                order={order}
                            />
                        ))
                    }
                </Stack>
                :
                <Stack mt={4}>
                    <Typography variant="h4">Nothing here...</Typography>
                    <Typography variant="body1" mb={2}>You haven't purchased any products yet.</Typography>
                    <Link href="/browse"><Button variant="contained" color="accent">Browse</Button></Link>
                </Stack>
            }
        </SectionContainer>
    )
}

export default Orders