import { verifyToken } from "@/lib/jwt/token"
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { cookies } from "next/headers"
import Link from "next/link"
    import SearchForm from "./SearchForm"
    import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MobileMenu from "./MobileMenu"

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
        <AppBar elevation={0} position="sticky" sx={{ backgroundColor: "primary.contrastText", borderBottom: "solid 1px", borderColor: "border.main" }}>
            <Toolbar sx={{ mx: "auto", width: "100%", maxWidth: "lg", gap: { xs: 2, sm: 8, md: 12, lg: 24 } }}>
                <Link href="/"><Typography variant="h4" color="primary">TeeStore</Typography></Link>

                <SearchForm />

                <Stack sx={{ display: { xs: "none", sm: "flex" } }} direction={"row"} gap={2} justifyContent="end" alignItems={"end"}>
                    <Link href={"/browse"}><Button>Browse</Button></Link>
                    
                    {
                        isAuthenticated ?
                        <>
                            <Link href={"/sell-tshirt"}><Button>Sell</Button></Link>
                            <Link href={"/profile"}><IconButton color="neutral"><PersonOutlinedIcon/></IconButton></Link>
                        </>
                        :
                        <Link href={"/register"}><Button color="accent" variant="contained">Join now</Button></Link>
                    }
                </Stack>

                <MobileMenu isAuthenticated={isAuthenticated} />
            </Toolbar>
        </AppBar>
    )
}

export default Header