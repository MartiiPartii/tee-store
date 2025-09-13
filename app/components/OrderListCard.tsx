import { OrderPreview } from "@/types/order"
import { Card, Stack, Typography } from "@mui/material"
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import Link from "next/link";

const OrderListCard = ({ order }: { order: OrderPreview }) => {
    const encodedId = btoa(String(order.id))

    return (
        <Link href={`/order/${encodedId}`}>
            <Card 
                variant="outlined"
                sx={{
                    p: 3,
                    cursor: "pointer"
                }}
            >
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                    <TaskAltOutlinedIcon color="accent" />

                    <Stack flex={1}>
                        <Typography variant="body1" fontWeight={500} fontSize={20} color="neutral">Order {order.id}</Typography>
                        <Typography variant="body1">Placed on {order.date.toDateString()}</Typography>
                    </Stack>

                    <Stack textAlign={"end"}>
                        <Typography variant="body1" fontSize={18} fontWeight={500} color="neutral">${order.item.price}</Typography>
                        <Typography variant="body2">1 item</Typography>
                    </Stack>
                </Stack>
            </Card>
        </Link>
    )
}

export default OrderListCard