import ImageInput from "@/app/components/ImageInput"
import SectionContainer from "@/app/components/SectionContainer"
import { Box, Card, Stack, Typography } from "@mui/material"

const Sell = () => {
    return (
        <SectionContainer
            props={{
                sx: {
                    paddingTop: 15,
                }
            }}
        >
            <Stack sx={{ maxWidth: "42rem" }} mx="auto">
                <Typography variant="h2">Sell your T-Shirt</Typography>
                <Typography variant="body1">Create a new listing and start selling your t-shirt</Typography>

                <Card variant="outlined" sx={{ padding: 3 }}>
                    <Typography variant="h3" mb={2}>T-Shirt Details</Typography>

                    <ImageInput />
                </Card>
            </Stack>
        </SectionContainer>
    )
}

export default Sell