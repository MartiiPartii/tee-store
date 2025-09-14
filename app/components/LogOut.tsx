"use client"

import { Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "@/actions/authenticate";
import { useState } from "react";
import Loader from "./Loader";

const LogOut = () => {
    const [loading, setLoading] = useState(false)

    const handleLogOut = async () => {
        setLoading(true)
        await logOut()
        setLoading(false)
    }

    return (
        <>
            { loading && <Loader /> }
            <Button onClick={handleLogOut} variant="contained" startIcon={<LogoutIcon />} color="accent" size="small">LogOut</Button>
        </>
    )
}

export default LogOut