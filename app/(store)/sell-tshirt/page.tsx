import SectionContainer from "@/app/components/SectionContainer"
import ShirtForm from "@/app/components/ShirtForm"
import { Box, Card, Stack, Typography } from "@mui/material"

const Sell = () => {
    return (
        <SectionContainer
            props={{
                sx: {
                    paddingTop: 15,
                    paddingBottom: 8
                }
            }}
        >
            <Stack sx={{ maxWidth: "42rem" }} mx="auto">
                <Typography variant="h2">Sell your T-Shirt</Typography>
                <Typography variant="body1" mb={3}>Create a new listing and start selling your t-shirt</Typography>

                <Card variant="outlined" sx={{ padding: 3 }}>
                    <Typography variant="h3" mb={2}>T-Shirt Details</Typography>

                    <ShirtForm
            
                    />
                </Card>
            </Stack>
        </SectionContainer>
    )
}

export default Sell