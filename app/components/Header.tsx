import { verifyToken } from "@/lib/jwt/token"
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material"
import { cookies } from "next/headers"
import Link from "next/link"

const Header = async () => {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    let isAuthenticated = false

    try {
        if(token) {
            const user = await verifyToken(token, process.env.JWT_SECRET!)
            if(user) isAuthenticated = true
        }
        else throw new Error()
    } catch (err) {

    }


    return (
        <AppBar position="sticky">
                <Toolbar sx={{ backgroundColor: "primary.contrastText" }}>
                    <Link href="/"><Typography variant="h4" color="primary">TeeStore</Typography></Link>

                    <Stack direction={"row"} gap={2} flex={1} justifyContent="end" alignItems={"end"}>
                        <Link href={"/browse"}><Button>Browse</Button></Link>
                        
                        {
                            isAuthenticated ?
                            <>
                                <Link href={"/sell-tshirt"}><Button>Sell</Button></Link>
                            </>
                            :
                            <Link href={"/register"}><Button color="accent" variant="contained">Join now</Button></Link>
                        }
                    </Stack>
                </Toolbar>
        </AppBar>
    )
}

export default Header