import { ProductOverview } from "@/types/shipping"
import { Box, Button, Card, Divider, Grid, Stack, Typography } from "@mui/material"
import Image from "next/image"
import PurchaseButton from "./PurchaseButton"
import Link from "next/link"

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
                                objectFit: "cover",
                                borderRadius: 10
                            }}
                        />
                    </Grid>
                    <Grid size="grow">
                        <Link href={`/shirt/${btoa(String(product.id))}`}><Typography variant="body1" color="neutral" sx={{
                            transition: ".2s",
                            "&:hover": {
                                color: "accent.main"
                            }
                        }}>{product.name}</Typography></Link>
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