import { Grid, Typography } from "@mui/material"

const HeroStat = ({ stat, label }: { stat: string, label: string }) => {
    return (
        <Grid size="grow" textAlign={"center"}>
            <Typography variant="h4" color="primary.contrastText">{stat}</Typography>
            <Typography variant="body1" color="primary.contrastText">{label}</Typography>
        </Grid>
    )
}

export default HeroStat