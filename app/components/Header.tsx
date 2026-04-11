import { verifyToken } from "@/lib/jwt/token"
import { cookies } from "next/headers"
import HeaderClient from "./HeaderClient"

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

    return <HeaderClient isAuthenticated={isAuthenticated} />
}

export default Header