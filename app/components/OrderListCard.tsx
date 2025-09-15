import { OrderPreview } from "@/types/order"
import { Card, Stack, Typography } from "@mui/material"
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import Link from "next/link";

const OrderListCard = ({ order }: { order: OrderPreview }) => {
    const encodedId = btoa(String(order.id))

    return (
        <Link href={`/orders/${encodedId}`}>
            <Card 
                variant="outlined"
                sx={{
                    p: 3,
                    cursor: "pointer"
                }}
            >
                <Stack direction={{ sm: "row" }} gap={2} alignItems={{ sm: "center" }}>
                    <Stack direction={"row"} flex={1} gap={2} alignItems={"center"}>
                        <TaskAltOutlinedIcon color="accent" />

                        <Stack>
                            <Typography variant="body1" fontWeight={500} fontSize={20} color="neutral">Order {order.id}</Typography>
                            <Typography variant="body1">Placed on {order.date.toDateString()}</Typography>
                        </Stack>
                    </Stack>

                    <Stack textAlign={{ sm: "end" }}>
                        <Typography variant="body1" fontSize={18} fontWeight={500} color="neutral">${order.item.price}</Typography>
                        <Typography variant="body2">1 item</Typography>
                    </Stack>
                </Stack>
            </Card>
        </Link>
    )
}

export default OrderListCard