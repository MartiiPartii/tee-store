import { Button, Grid, Stack, Typography } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HeroStat from "./HeroStat";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <Stack
            sx={{
                background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/hero.webp)",
                backgroundSize: "cover"
            }}
        >
            <Stack
                sx={{ alignItems: "center", textAlign: "center", maxWidth: "48rem", margin: "0 auto", padding: `3.6rem` }}
            >
                <Typography variant="body1" mb={3} fontWeight={"bold"} color="primary.contrastText" fontSize={18}>✨ Premium Quality</Typography>

                <Typography variant="h1" color="primary.contrastText">Express yourself</Typography>
                <Typography variant="h1" mb={1} color="accent">Through Style</Typography>

                <Typography variant="body1" color="primary.contrastText" mb={3} fontSize={24}>Discover unique t-shirts from our curated collection and talented designers worldwide. Quality meets creativity.</Typography>
            
                <Link href={"/browse"}><Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon sx={{ width: "1.2rem", height: "1.2rem" }} />}>Shop collection</Button></Link>
            
                <Grid mt={6} spacing={2} container width={"100%"}>
                    <HeroStat
                        stat="10K+"
                        label="Happy Customers"
                    />
                    <HeroStat
                        stat="500K+"
                        label="Unique Designs"
                    />
                    <HeroStat
                        stat="100+"
                        label="Artists"
                    />
                </Grid>
            </Stack>
        </Stack>
    )
}

export default Hero