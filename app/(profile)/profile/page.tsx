import SectionContainer from "@/app/components/SectionContainer"
import { Card, Grid, Stack, Typography } from "@mui/material"
import UserInfo from "@/app/components/UserInfo"
import { ShoppingBag, Shirt, DollarSign } from 'lucide-react'
import ProfileStatCard from "@/app/components/ProfileStatCard"
import LogOut from "@/app/components/LogOut"
import { getAccount } from "@/actions/authenticate"

const Profile = async () => {
    const { user, shirts, profit, orders, error } = await getAccount()

    return (
        <SectionContainer
            props={{
                sx: {
                    py: 12
                }
            }}
        >
            <Stack mb={4}>
                <Typography variant="h2">My Profile</Typography>
                <Typography variant="body1">Here you can check out your account's info and statistics.</Typography>
                { error && 
                    <Stack gap={2} alignItems={"start"}>
                        <Typography variant="body1" fontStyle={"italic"} color="error">{error}</Typography>
                        <LogOut />
                    </Stack>
                }
            </Stack>

            {
                !error &&
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card variant="outlined" sx={{ p: 3, height: "100%" }}>
                            <Typography color="neutral" mb={2} variant="h2">{user?.firstName || ""} {user?.lastName || ""}</Typography>

                            <Stack gap={1} mb={2}>
                                <UserInfo
                                    label="Email"
                                    text={user?.email || ""}
                                />
                                <UserInfo
                                    label="Phone Number"
                                    text={user?.phoneNumber || ""}
                                />
                                <UserInfo
                                    label="Address"
                                    text={user?.address || ""}
                                />
                            </Stack>

                            <LogOut />
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={3}>
                            <ProfileStatCard
                                Icon={Shirt}
                                stat={String(shirts)}
                                label="Shirts Selling"
                                size={{ xs: 12, md: 6 }}
                                link="/my-shirts"
                            />
                            <ProfileStatCard
                                Icon={DollarSign}
                                stat={String(profit)}
                                label="Total Earned"
                                size={{ xs: 12, md: 6 }}
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
            }
        </SectionContainer>
    )
}

export default Profile