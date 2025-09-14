"use client"

import { Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "@/actions/authenticate";

const LogOut = () => {

    return (
        <Button onClick={async () => await logOut()} variant="contained" startIcon={<LogoutIcon />} color="accent" size="small">LogOut</Button>
    )
}

export default LogOut