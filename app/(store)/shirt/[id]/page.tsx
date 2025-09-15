import SectionContainer from "@/app/components/SectionContainer"
import { Button, Chip, Grid, Stack, Typography } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import Image from "next/image"
import placeholder from "@/public/placeholder.webp"
import Link from "next/link";
import { getShirt } from "@/actions/store";

const Shirt = async ({ params }: { params: { id: string } }) => {
    const encodedId = (await params).id
    const b64 = encodedId ? decodeURIComponent(encodedId) : ""

    const { shirt, user } = await getShirt(b64)

    return (
        <SectionContainer
            props={{
                sx: { py: 8 }
            }}
        >
            {
                shirt &&
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 4, lg: 6 }}>
                        <Image
                            src={shirt.imageLink || placeholder}
                            alt="Product Image"
                            width={1000}
                            height={1000}
                            style={{
                                width: "100%",
                                height: "auto",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                borderRadius: "10px"
                            }}
                        />
                    </Grid>

                    <Grid size="grow" component={Stack}>
                        <Stack direction="row" gap={1} sx={{ marginBottom: 1 }}>
                            {
                                !shirt.soldByPlatform &&
                                <Chip label={`By ${user!.firstName || ""} ${user!.lastName || ""}`} variant="filled" size="small" color="accent" />
                            }
                            <Chip label="In Stock" icon={<CheckIcon />} variant="outlined" size="small" color="accent" />
                        </Stack>

                        <Typography variant="h1" mb={2} color="neutral">{shirt.name}</Typography>

                        <Typography variant="h2" mb={3} color="accent">${shirt.price}</Typography>

                        <Stack flex={1}>
                            <Stack flex={1}>
                                <Typography variant="body1" fontWeight={500} mb={1} color="neutral">Description</Typography>
                                <Typography variant="body1" mb={4}>{shirt.description}</Typography>
                            </Stack>

                            <Link href={`/shirt/${b64}/purchase`}><Button variant="contained" color="accent" size="large" fullWidth>Buy - ${shirt.price}</Button></Link>
                        </Stack>
                    </Grid>
                </Grid>
            }
        </SectionContainer>
    )
}

export default Shirt