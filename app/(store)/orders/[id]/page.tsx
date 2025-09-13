import { OrderDetailsInterface } from "@/types/order"
import { prisma } from "@/lib/prisma"
import { getUserId } from "@/lib/jwt/token"
import SectionContainer from "@/app/components/SectionContainer"
import { Card, Grid, Stack, Typography } from "@mui/material"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Image from "next/image"
import DownloadPdf from "@/app/components/DownloadPdf"

const OrderDetails = async ({ params }: { params: { id: string } }) => {
    const userId = await getUserId()

    const encodedId = (await params).id
    const b64id = decodeURIComponent(encodedId)
    const id = Number(atob(b64id))

    let order: OrderDetailsInterface | null = null
    try {
        order = await prisma.order.findUnique({
            where: {
                id,
                userId: Number(userId)
            },
            select: {
                id: true,
                date: true,
                address: true,
                firstName: true,
                lastName: true,
                phone: true,
                itemSize: true,
                item: {
                    include: {
                        seller: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        })
    } catch(err) {
        throw new Error("Order not found.")
    }

    console.log(order)


    return (
        order &&
        <SectionContainer
            props={{
                sx: {
                    py: 12
                }
            }}
        >
            <Stack direction={"row"} alignItems={"end"} mb={3} justifyContent={"space-between"}>
                <Stack>
                    <Typography variant="h2" mb={1}>Order №{order.id}</Typography>
                    <Typography variant="body1">Placed on {order.date.toDateString()}</Typography>
                </Stack>

                <DownloadPdf order={order} />
            </Stack>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Card variant="outlined" sx={{ p: 3 }}>
                        <Typography variant="h3" mb={2}>Ordered Item</Typography>

                        <Grid container spacing={6} alignItems={"start"}>
                            <Grid size={8}>
                                <Stack direction={"row"} alignItems={"stretch"} gap={2}>
                                    <Image
                                        src={order.item.imageLink}
                                        alt="Product Image"
                                        width={100}
                                        height={100}
                                        style={{
                                            height: "auto",
                                            aspectRatio: "1 / 1",
                                            borderRadius: 10
                                        }}
                                    />

                                    <Stack>
                                        <Typography variant="body1" color="neutral" fontWeight={600}>{order.item.name}</Typography>
                                        <Typography variant="body2" mb={1}>{order.item.description.length > 100 ? `${order.item.description.substring(0, 100)}...` : order.item.description}</Typography>
                                        <Typography variant="body2">Product size: <Typography variant="span" color="neutral">{order.itemSize}</Typography></Typography>
                                    </Stack>
                                </Stack>
                            </Grid>

                            <Grid size="grow" component={Stack} alignItems={"end"}>
                                <Typography variant="body1" color="neutral" fontSize={20} fontWeight={600}>${order.item.price}</Typography>
                                <Typography variant="body2">Sold by <Typography variant="span" color="accent">{order.item.soldByPlatform ? "TeeStore" : `${order.item.seller?.firstName} ${order.item.seller?.lastName}`}</Typography></Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid size="grow">
                    <Card variant="outlined" sx={{ p: 3 }}>
                        <Stack direction={"row"} alignItems={"center"} gap={1} mb={2}>
                            <LocationOnOutlinedIcon sx={{ width: "2rem", height: "2rem" }} />
                            <Typography variant="h3">Shipping details</Typography>
                        </Stack>

                        <Typography variant="body1" mb={1}>Receiver: <Typography color="neutral" variant="span">{order.firstName} {order.lastName}</Typography></Typography>
                        <Typography variant="body1" mb={1}>Phone Number: <Typography color="neutral" variant="span">{order.phone}</Typography></Typography>
                        <Typography variant="body1" mb={1}>Shipment Address: <Typography color="neutral" variant="span">{order.address}</Typography></Typography>
                    </Card>
                </Grid>
            </Grid>

        </SectionContainer>
    )
}

export default OrderDetails