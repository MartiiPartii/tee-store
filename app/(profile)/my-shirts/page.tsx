import SectionContainer from "@/app/components/SectionContainer"
import { getUserId } from "@/lib/jwt/token"
import { ShirtOverview } from "@/types/shirt"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { prisma } from "@/lib/prisma"
import AddIcon from '@mui/icons-material/Add';
import OrdersStatCard from "@/app/components/OrdersStatCard"
import MyShirtCard from "@/app/components/MyShirtCard"
import Link from "next/link"

const MyShirts = async () => {
    const userId = await getUserId() as number


    let shirts: ShirtOverview[] | null = null
    let totalSales: number = 0
    let totalRevenue: number = 0
    try {
        shirts = await prisma.shirt.findMany({
            where: { sellerId: userId },
            select: {
                id: true,
                imageLink: true,
                name: true,
                description: true,
                price: true,
                _count: {
                    select: {
                        orders: true
                    }
                }
            }
        })
        shirts = shirts.map(shirt => {
            const revenue = shirt.price * shirt._count.orders
            totalRevenue += revenue
            return {
                ...shirt,
                revenue
            }
        })
        const saleCounts = shirts.map(shirt => shirt._count.orders)
        totalSales = saleCounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    } catch(err) {

    }


    return (
        <SectionContainer
            props={{
                sx: {
                    py: 8
                }
            }}
        >
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Stack>
                    <Typography variant="h2" mb={1}>My T-Shirts</Typography>
                    <Typography variant="body1" mb={3}>Manage your t-shirt listings and track performance</Typography>
                </Stack>

                <Link href={'/sell-tshirt'}><Button startIcon={<AddIcon />} variant="contained" color="accent">Sell New T-Shirt</Button></Link>
            </Stack>

            <Grid container spacing={2} mb={3}>
                <OrdersStatCard stat={String(shirts?.length || 0)} label="Total Listings" />
                <OrdersStatCard stat={String(totalSales || 0)} label="Total Sales" />
                <OrdersStatCard stat={`$${String(totalRevenue || 0)}`} label="Total Revenue" />
            </Grid>

            {
                shirts && shirts.length > 0 &&
                <Stack gap={2}>
                    {
                        shirts.map((shirt, i) => (
                            <MyShirtCard shirt={shirt} key={i} />
                        ))
                    }
                </Stack>
            }
        </SectionContainer>
    )
}

export default MyShirts