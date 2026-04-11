"use client"

import { Button, Drawer, IconButton, Stack, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import Link from "next/link";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const MobileMenu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Stack
                sx={{ display: { xs: "flex", sm: "none" } }}
            >
                <IconButton onClick={() => setIsOpen(true)} color="neutral"><MenuIcon/></IconButton>
            </Stack>

            <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                <Stack sx={{
                    py: 2,
                    px: 4
                }} gap={1}>
                    <Typography mb={2} variant="h4">TeeStore</Typography>

                    <Link href={"/browse"}><Typography variant="body1" color="primary" sx={{ transition: "color 0.2s", "&:hover": { color: "accent.main" } }}>Browse</Typography></Link>

                    {
                        isAuthenticated ?
                        <>
                            <Link href={"/sell-tshirt"}><Typography variant="body1" color="primary" sx={{ transition: "color 0.2s", "&:hover": { color: "accent.main" } }}>Sell</Typography></Link>
                            <Link href={"/profile"}><Typography variant="body1" color="primary" sx={{ transition: "color 0.2s", "&:hover": { color: "accent.main" } }}>Profile</Typography></Link>
                        </>
                        :
                        <Link href={"/register"}><Typography variant="body1" sx={{ color: "accent.main", transition: "color 0.2s", "&:hover": { color: "accent.dark" } }}>Join now</Typography></Link>
                    }
                </Stack>
            </Drawer>
        </>
    )
}

export default MobileMenu