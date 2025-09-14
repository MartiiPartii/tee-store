import SectionContainer from "@/app/components/SectionContainer"
import { Grid, Typography } from "@mui/material"
import PurchaseForm from "@/app/components/PurchaseForm";
import OrderSummary from "@/app/components/OrderSummary";
import { getProductOverview, getUserShippingInfo } from "@/actions/purchase";

const Purchase = async ({ params }: { params: { id: string } }) => {
    const user = await getUserShippingInfo()
    const encodedId = (await params).id
    const b64id = decodeURIComponent(encodedId)
    const product = await getProductOverview(b64id)


    return (
        <SectionContainer
            props={{
                sx: {
                    py: 8
                }
            }}
        >
            <Typography variant="h2" mb={1}>Checkout</Typography>

            <Grid container spacing={3}>
                <Grid size={8} sx={{ py: 2 }}>
                    {user && <PurchaseForm user={user} productId={product.id} />}
                </Grid>
                <Grid size="grow">
                    <OrderSummary product={product} />
                </Grid>
            </Grid>
        </SectionContainer>
    )
}

export default Purchase