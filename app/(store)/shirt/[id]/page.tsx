import SectionContainer from "@/app/components/SectionContainer"
import { Button, Chip, Grid, Stack, Typography } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import { User } from "@/app/generated/prisma";
import placeholder from "@/public/placeholder.webp"
import Link from "next/link";

const Shirt = async ({ params }: { params: { id: string } }) => {
    const encodedId = (await params).id
    const b64 = encodedId ? decodeURIComponent(encodedId) : ""
    const rawId = atob(b64)

    const shirt = await prisma.shirt.findUnique({ where: { id: Number(rawId) } })

    let user: { firstName: string, lastName: string } | null
    if(shirt && !shirt.soldByPlatform) {
        const sellerId: number = shirt.sellerId!
        user = await prisma.user.findUnique({
            where: { id: sellerId },
            select: { firstName: true, lastName: true }
        })
    }

    return (
        <SectionContainer
            props={{
                sx: { padding: `8rem 0` }
            }}
        >
            {
                shirt ?
                <Grid container spacing={6}>
                    <Grid size={6}>
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
                :
                <Typography variant="h3">Not found</Typography>
            }
        </SectionContainer>
    )
}

export default Shirt