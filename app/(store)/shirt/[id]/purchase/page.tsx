import SectionContainer from "@/app/components/SectionContainer"
import { Grid, Typography } from "@mui/material"
import PurchaseForm from "@/app/components/PurchaseForm";
import { getUserId } from "@/lib/jwt/token";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProductOverview, UserShippingInfo } from "@/types/shipping";
import OrderSummary from "@/app/components/OrderSummary";

const Purchase = async ({ params }: { params: { id: string } }) => {
    const userId = await getUserId() as number

    let user: UserShippingInfo | null
    try {
        user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
                address: true
            }
        })
    } catch(err) {
        redirect("/login")
    }

    // console.log(user)

    const encodedId = (await params).id
    const b64id = decodeURIComponent(encodedId)
    const productId = atob(b64id)

    const product: ProductOverview | null = await prisma.shirt.findUnique({
        where: { id: Number(productId) },
        select: {
            id: true,
            imageLink: true,
            name: true,
            soldByPlatform: true,
            price: true,
            seller: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })

    if(!product) throw new Error()

    // console.log(product)


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