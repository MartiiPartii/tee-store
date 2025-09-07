import SectionContainer from "@/app/components/SectionContainer"
import { Card, Typography } from "@mui/material"

const Register = () => {
    return (
        <SectionContainer>
            <Card variant="outlined" sx={{ padding: 3, textAlign: "center" }}>
                <Typography variant="h3" mb={1}>Create an Account</Typography>
                <Typography variant="body2">Join our community to purchase our best products or start selling your own designs</Typography>
            </Card>
        </SectionContainer>
    )
}

export default Register