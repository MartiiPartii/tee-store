import { Card, Grid, Typography } from "@mui/material"

const OrdersStatCard = ({ stat, label }: { stat: string, label: string }) => {
    return (
        <Grid size={4}>
            <Card variant="outlined" sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h3" color="neutral">{stat}</Typography>
                <Typography variant="body1">{label}</Typography>
            </Card>
        </Grid>
    )
}

export default OrdersStatCard