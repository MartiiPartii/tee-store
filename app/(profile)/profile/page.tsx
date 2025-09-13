import { getUserId } from "@/lib/jwt/token"
import { UserProfile } from "@/types/profile"
import { prisma } from "@/lib/prisma"
import SectionContainer from "@/app/components/SectionContainer"
import { Card, Grid, Stack, Typography } from "@mui/material"
import UserInfo from "@/app/components/UserInfo"
import { Edit, ShoppingBag, Shirt, DollarSign, Star } from 'lucide-react'
import ProfileStatCard from "@/app/components/ProfileStatCard"
import LogOut from "@/app/components/LogOut"
import Link from "next/link"

const Profile = async () => {
    const userId = await getUserId() as number

    let user: UserProfile | null = null
    let shirts: number | null = 0
    let profit: number = 0
    let orders: number = 0
    try {
        user = await prisma.user.findUnique({
            where: { id: userId }
        })

        shirts = await prisma.shirt.count({
            where: { sellerId: userId }
        })

        orders = await prisma.order.count({
            where: { userId }
        })

        const sales = await prisma.order.findMany({
            where: {
                item: {
                    sellerId: userId
                }
            },
            select: {
                item: {
                    select: {
                        price: true
                    }
                }
            }
        })
        const prices = sales.map(sale => sale.item.price)
        profit = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    } catch(err) {

    }

    return (
        user &&
        <SectionContainer
            props={{
                sx: {
                    py: 12
                }
            }}
        >
            <Grid container spacing={3}>
                <Grid size={6}>
                    <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
                        <Typography color="neutral" mb={2} variant="h2">{user.firstName} {user.lastName}</Typography>

                        <Stack gap={1} mb={2}>
                            <UserInfo
                                label="Email"
                                text={user.email}
                            />
                            <UserInfo
                                label="Phone Number"
                                text={user.phoneNumber}
                            />
                            <UserInfo
                                label="Address"
                                text={user.address}
                            />
                        </Stack>

                        <LogOut />
                    </Card>
                </Grid>
                <Grid size={6}>
                    <Grid container spacing={3}>
                        <ProfileStatCard
                            Icon={Shirt}
                            stat={String(shirts)}
                            label="Shirts Selling"
                            size={6}
                            link="/my-shirts"
                        />
                        <ProfileStatCard
                            Icon={DollarSign}
                            stat={String(profit)}
                            label="Total Earned"
                            size={6}
                        />
                        <ProfileStatCard
                            Icon={ShoppingBag}
                            stat={String(orders)}
                            label="Orders"
                            size={12}
                            link="/orders"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </SectionContainer>
    )
}

export default Profile