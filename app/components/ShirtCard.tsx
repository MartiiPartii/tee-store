import { Shirt } from "@/types/shirt"
import { Button, Card, Grid, Stack, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ShirtCard = ({ shirt }: { shirt: Shirt }) => {
    return (
        <Grid size={3}>
            <Card variant="outlined" sx={{ textAlign: "start", height: "100%", display: "flex", flexDirection: "column" }}>
                <Image
                    width={256}
                    height={256}
                    alt={shirt.name}
                    src={shirt.imageLink}
                    style={{
                        width: "100%",
                        objectFit: "cover"
                    }}
                />

                <Stack flex={1} sx={{ padding: 2 }}>
                    <Stack flex={1}>
                        <Link href={`/shirt/${shirt.id}`}><Typography mt={2} mb={1} variant="h5" fontSize={"1.4rem"} color="primary" sx={{ transition: ".2s", "&:hover": { color: "accent.main" } }}>{shirt.name}</Typography></Link>
                        <Typography mb={1.5} variant="body2" color="neutral.light">{shirt.description}</Typography>
                    </Stack>

                    <Stack>
                        <Typography mb={2} variant="h5" color="primary">${shirt.price}</Typography>
                        <Button size="large" startIcon={<ShoppingCartOutlinedIcon />} sx={{ justifySelf: "end" }} variant="contained" color="accent" fullWidth>Add to cart</Button>
                    </Stack>
                </Stack>
            </Card>
        </Grid>
    )
}

export default ShirtCard