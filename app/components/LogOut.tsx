"use client"

import { Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { authFetch } from "@/lib/api/api";
import { useRouter } from "next/navigation";

const LogOut = () => {
    const router = useRouter()
    const handleLogOut = async () => {
        try {
            const response = await authFetch("http://localhost:3000/api/auth/logout", {
                method: "GET"
            })

            if(response.ok) {
                router.push("/login")
            }
        } catch(err) {
            console.error(err)
        }

    }

    return (
        <Button onClick={() => handleLogOut()} variant="contained" startIcon={<LogoutIcon />} color="accent" size="small">LogOut</Button>
    )
}

export default LogOut