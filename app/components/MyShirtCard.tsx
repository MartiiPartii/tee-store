import { ShirtOverview } from "@/types/shirt"
import { Card, Grid, Stack, Typography } from "@mui/material"
import Image from "next/image"
import blank from "@/public/placeholder.webp"
import Link from "next/link"

const MyShirtCard = ({ shirt }: { shirt: ShirtOverview }) => {
    const encodedId = btoa(String(shirt.id))

    return (
        <Card variant="outlined" sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid size={1.5}>
                    <Image
                        src={shirt.imageLink ? shirt.imageLink : blank} 
                        alt="Product image"
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
                    <Link href={`/shirt/${encodedId}`}>
                        <Typography
                            variant="h4"
                            mb={1}
                            sx={{ 
                                transition: ".2s",
                                color: "neutral.main",
                                "&:hover": {
                                    color: "accent.main"
                                }
                            }}
                        >{shirt.name}</Typography>
                    </Link>
                    <Typography variant="h3" mb={1} color="accent">${shirt.price}</Typography>
                    <Typography variant="body1" mb={3}>{shirt.description.length > 200 ? `${shirt.description.substring(0, 200)}...` : shirt.description}</Typography>
                
                    <Stack direction={"row"} justifyContent={"space-between"} width={"25%"}>
                        <Stack>
                            <Typography variant="body2">Sales</Typography>
                            <Typography variant="body1" fontWeight={600} color="neutral">{shirt._count.orders}</Typography>
                        </Stack>
                        <Stack>
                            <Typography variant="body2">Revenue</Typography>
                            <Typography variant="body1" fontWeight={600} color="neutral">${shirt.revenue}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    )
}

export default MyShirtCard