import { ProductOverview } from "@/types/shipping"
import { Box, Button, Card, Divider, Grid, Stack, Typography } from "@mui/material"
import Image from "next/image"
import PurchaseButton from "./PurchaseButton"

const OrderSummary = ({ product }: { product: ProductOverview }) => {
    return (
        <Box sx={{ py: 2, position: "sticky", top: 80 }}>
            <Card variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h3" mb={3}>Order Summary</Typography>

                <Grid mb={1} spacing={2} container alignItems={"center"}>
                    <Grid size={3}>
                        <Image
                            src={product.imageLink}
                            alt="Product Image"
                            width={100}
                            height={100}
                            style={{
                                width: "100%",
                                height: "auto",
                                aspectRatio: "1 / 1",
                                borderRadius: 10
                            }}
                        />
                    </Grid>
                    <Grid size="grow">
                        <Typography variant="body1" color="neutral">{product.name}</Typography>
                        <Typography variant="body1">By {product.soldByPlatform ? "TeeStore" : `${product.seller?.firstName} ${product.seller?.lastName}`}</Typography>
                    </Grid>
                    <Grid size={3}>
                        <Typography textAlign={"end"} variant="body1" color="neutral">${product.price}</Typography>
                    </Grid>
                </Grid>

                <Divider/>

                <Stack direction={"row"} gap={1} mt={2} mb={3} justifyContent={"space-between"}>
                    <Typography variant="body1" fontSize={20} fontWeight={500} color="neutral">Total</Typography>
                    <Typography variant="body1" fontSize={20} fontWeight={500} color="neutral">${product.price}</Typography>
                </Stack>
                
                <PurchaseButton />
            </Card>
        </Box>
    )
}

export default OrderSummary