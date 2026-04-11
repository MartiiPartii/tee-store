"use client"

import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import SearchForm from "./SearchForm"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import MobileMenu from "./MobileMenu"

const HEADER_SCROLL_THRESHOLD = 8

type Props = {
    isAuthenticated: boolean
}

const HeaderClient = ({ isAuthenticated }: Props) => {
    const pathname = usePathname()
    const theme = useTheme()
    const isHome = pathname === "/"
    const [homeScrollNav, setHomeScrollNav] = useState(false)

    useEffect(() => {
        if (!isHome) return
        const update = () => setHomeScrollNav(window.scrollY > HEADER_SCROLL_THRESHOLD)
        update()
        window.addEventListener("scroll", update, { passive: true })
        return () => window.removeEventListener("scroll", update)
    }, [isHome])

    const navVisible = !isHome || homeScrollNav

    return (
        <>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "primary.contrastText",
                    borderBottom: "solid 1px",
                    borderColor: "border.main",
                    transform: navVisible ? "translateY(0)" : "translateY(-100%)",
                    transition: theme.transitions.create("transform", {
                        duration: theme.transitions.duration.shorter,
                        easing: theme.transitions.easing.easeOut,
                    }),
                }}
            >
                <Toolbar sx={{ mx: "auto", width: "100%", maxWidth: "lg", gap: { xs: 2, sm: 8, md: 12, lg: 24 } }}>
                    <Link href="/"><Typography variant="h4" color="primary">TeeStore</Typography></Link>

                    <SearchForm />

                    <Stack sx={{ display: { xs: "none", sm: "flex" } }} direction={"row"} gap={2} justifyContent="end" alignItems={"end"}>
                        <Link href={"/browse"}><Button>Browse</Button></Link>

                        {
                            isAuthenticated ?
                                <>
                                    <Link href={"/sell-tshirt"}><Button>Sell</Button></Link>
                                    <Link href={"/profile"}><IconButton color="neutral"><PersonOutlinedIcon /></IconButton></Link>
                                </>
                                :
                                <Link href={"/register"}><Button color="accent" variant="contained">Join now</Button></Link>
                        }
                    </Stack>

                    <MobileMenu isAuthenticated={isAuthenticated} />
                </Toolbar>
            </AppBar>
            {!isHome && <Box sx={theme.mixins.toolbar} />}
        </>
    )
}

export default HeaderClient
