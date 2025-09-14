import SectionContainer from "@/app/components/SectionContainer"
import { Button, Grid, Stack, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import OrdersStatCard from "@/app/components/OrdersStatCard"
import MyShirtCard from "@/app/components/MyShirtCard"
import Link from "next/link"
import { getMyShirts } from "@/actions/store"

const MyShirts = async () => {
    const { shirts, totalSales, totalRevenue, error } = await getMyShirts()


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

            {
                error ?
                <Typography variant="body1" color="error" fontStyle={"italic"}>{error}</Typography>
                :
                <>
                    <Grid container spacing={2} mb={3}>
                        <OrdersStatCard stat={String(shirts?.length || 0)} label="Total Listings" />
                        <OrdersStatCard stat={String(totalSales || 0)} label="Total Sales" />
                        <OrdersStatCard stat={`$${String(totalRevenue || 0)}`} label="Total Revenue" />
                    </Grid>

                    {
                        shirts && shirts.length > 0 ?
                        <Stack gap={2}>
                            {
                                shirts.map((shirt, i) => (
                                    <MyShirtCard shirt={shirt} key={i} />
                                ))
                            }
                        </Stack>
                        :
                        <Stack gap={1}>
                            <Typography variant="body1">You have no products yet...</Typography>
                            <Link href={'/sell-tshirt'}><Button size="small" startIcon={<AddIcon />} variant="contained" color="accent">Sell New T-Shirt</Button></Link>
                        </Stack>
                    }
                </>
            }
        </SectionContainer>
    )
}

export default MyShirts