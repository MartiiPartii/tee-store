import SectionContainer from "@/app/components/SectionContainer"
import { Button, Stack, Typography } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Link from "next/link";



const Verify = async ({ params }: { params: { uidb: string, token: string } }) => {
    const { uidb, token } = await params
    let title = "Something went wrong.", text = "", button = "Home", link = "/", success = false
    const response = await fetch("http://localhost:3000/api/auth/verify/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uidb,
            token
        })

    })
    
    if(response.status == 200) {
        title = "Account verified."
        text = "Your account was successfully verified. Now you can login."
        button = "Login"
        link = "/login"
        success = true
    } else {
        text = (await response.json()).error
    }

    return (
        <SectionContainer props={{
            component: Stack,
            sx: { justifyContent: "center", minHeight: "100vh" }
        }}>
            <Stack maxWidth={"36rem"} alignItems={"center"} mx="auto">
                {
                    success ?
                    <CheckCircleOutlineIcon sx={{ color: "success.main", width: "4.8rem", height: "4.8rem" }} />
                    :
                    <HighlightOffIcon sx={{ color: "error.main", width: "4.8rem", height: "4.8rem" }} />
                }

                <Typography variant="h2">{title}</Typography>
                <Typography variant="body1" mb={3}>{text}</Typography>

                <Link href={link}><Button variant="contained" color="primary">{button}</Button></Link>
            </Stack>
        </SectionContainer>
    )
}

export default Verify