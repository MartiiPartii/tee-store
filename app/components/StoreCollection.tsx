import { Grid, Typography } from "@mui/material"
import ShirtCard from "./ShirtCard"
import { Shirt } from "@/types/shirt"

const StoreCollection = async ({ collection }: { collection: Shirt[] }) => {
    return (
        <Grid container spacing={3}>
            {
                collection.map((shirt: Shirt, i: number) => (
                    <ShirtCard key={i} shirt={shirt} />
                ))
            }
        </Grid>
    )
}

export default StoreCollection