import { Grid, Typography } from "@mui/material"
import SectionContainer from "./SectionContainer"
import ShirtCard from "./ShirtCard"
import { Shirt } from "@/types/shirt"

const StoreCollection = async () => {
    const response = await fetch("http://localhost:3000/api/store/shirt?take=4&seller=0", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const data = (await response.json()).data


    return (
        <SectionContainer props={{
            sx: { textAlign: "center", padding: `3.2rem` }
        }}>
            <Typography variant="h2" mb={3} color="neutral">Our premium collection</Typography>

            {
                data && data.length > 0 &&
                <Grid container spacing={3}>
                    {
                        data.map((shirt: Shirt, i: number) => (
                            <ShirtCard key={i} shirt={shirt} />
                        ))
                    }
                </Grid>
            }
        </SectionContainer>
    )
}

export default StoreCollection