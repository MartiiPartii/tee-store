import { Box, Card, Grid, Stack, Typography } from "@mui/material"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

const ProfileStatCard = ({ Icon, stat, label, size, link }: { Icon: LucideIcon, stat: string, label: string, size: number, link?: string }) => {
    return (
        <Grid size={size}>
            <Link href={link ? link : ""}>
                <Card component={Stack} alignItems="center" textAlign="center" variant="outlined" sx={{ p: 3 }}>
                    <Box mb={1} sx={{ color: "accent.main" }}><Icon size={32} /></Box>
                    <Typography variant="h3" color="neutral">{stat}</Typography>
                    <Typography variant="body1">{label}</Typography>
                </Card>
            </Link>
        </Grid>
    )
}

export default ProfileStatCard