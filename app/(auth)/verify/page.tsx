import SectionContainer from "@/app/components/SectionContainer"
import { Button, Card, Stack, Typography } from "@mui/material"
import Link from "next/link"
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Verify = () => {
    return (
        <SectionContainer props={{
            component: Stack,
            sx: {
                minHeight: "100vh",
                justifyContent: "center",
            }
        }}>
            <Card
                sx={{ textAlign: "center", maxWidth: "28rem", padding: 3, margin: "0 auto" }}
            >
                <MailOutlineIcon
                    sx={{ width: "6rem", height: "6rem" }}
                />

                <Typography variant="h2">Verify your account.</Typography>
                <Typography mb={3} variant="body1">We've sent a verification link to your email. Once you're verified you can start shopping.</Typography>

                <Stack direction="row" gap={1} justifyContent={"center"}>
                    <Link href="/"><Button variant="outlined" color="accent">Home</Button></Link>
                    <Link href="/login"><Button variant="contained" color="accent">Login</Button></Link>
                </Stack>
            </Card>
        </SectionContainer>
    )
}

export default Verify