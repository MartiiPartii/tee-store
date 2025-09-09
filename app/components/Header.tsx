import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material"
import Link from "next/link"

const Header = () => {
    return (
        <AppBar>
                <Toolbar sx={{ backgroundColor: "primary.contrastText" }}>
                    <Typography variant="h4" color="primary">TeeStore</Typography>

                    <Stack direction={"row"} gap={2} flex={1} justifyContent="end" alignItems={"end"}>
                        <Link href={"/browse"}><Button>Browse</Button></Link>
                        <Link href={"/register"}><Button color="accent" variant="contained">Join now</Button></Link>
                    </Stack>
                </Toolbar>
        </AppBar>
    )
}

export default Header