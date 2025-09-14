import SectionContainer from "@/app/components/SectionContainer"
import { Button, Stack, Typography } from "@mui/material"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Link from "next/link";
import { verifyAccount } from "@/actions/authenticate";



const Verify = async ({ params }: { params: { uidb: string, token: string } }) => {
    const { uidb, token } = await params
    let title = "Account verified.", text = "Your account was successfully verified. Now you can login.", button = "Login", link = "/login", success = true

    try {
        await verifyAccount(uidb, token)
    } catch(err) {
        title = err instanceof Error ? err.message : "Something went wrong"
        text = ""
        button = "Home"
        link = "/"
        success = false
    }

    // })
    
    // if(response.status == 200) {
        // title = "Account verified."
        // text = "Your account was successfully verified. Now you can login."
        // button = "Login"
        // link = "/login"
        // success = true
    // } else {
    //     text = (await response.json()).error
    // }

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