import { Shirt } from "../generated/prisma"
import { Button, Card, Chip, Grid, Stack, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import placeholder from "@/public/placeholder.webp"
import { getShirtSeller } from "@/actions/store"

const ShirtCard = async ({ shirt, button = true }: { shirt: Shirt, button?: boolean }) => {
    const encodedId = btoa(String(shirt.id))

    let seller: { firstName: string, lastName: string } | null = null
    if(!shirt.soldByPlatform) {
        const sellerId = shirt.sellerId!
        seller = await getShirtSeller(sellerId)
    }

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ textAlign: "start", height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>
                {
                    !shirt.soldByPlatform && seller &&
                    <Chip
                        label={`By ${seller.firstName} ${seller.lastName}`}
                        size="small"
                        color="accent"
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12
                        }}
                    />
                }
                
                <Image
                    width={256}
                    height={256}
                    alt={shirt.name}
                    src={shirt.imageLink || placeholder}
                    style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        objectPosition: "center"
                    }}
                />

                <Stack flex={1} sx={{ padding: 2 }}>
                    <Stack flex={1}>
                        <Link href={`/shirt/${encodedId}`}><Typography mt={2} mb={1} variant="h5" fontSize={"1.4rem"} color="primary" sx={{ transition: ".2s", "&:hover": { color: "accent.main" } }}>{shirt.name}</Typography></Link>
                        <Typography mb={1.5} variant="body2" color="neutral.light">
                            {shirt.description.length > 100 ? `${shirt.description.substring(0, 200)}...` : shirt.description}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography mb={2} variant="h5" color="primary">${shirt.price}</Typography>
                        {button && <Link href={`/shirt/${encodedId}/purchase`}><Button size="large" sx={{ justifySelf: "end" }} variant="contained" color="accent" fullWidth>Purchase - ${shirt.price}</Button></Link>}
                    </Stack>
                </Stack>
            </Card>
        </Grid>
    )
}

export default ShirtCard