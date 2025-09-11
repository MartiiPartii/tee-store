import { NextRequest } from "next/server"
import { verifyToken } from "../jwt/token"

export const isAuth = async (req: NextRequest) => {
    try {
        const tokenCookie = req.cookies.get("token")
        const token = tokenCookie?.value || null
        console.log(token)
        
        if(token) {
            const decoded = await verifyToken(token, process.env.JWT_SECRET!)
        }
        else throw new Error("Unauthorized")

        return true
    } catch(err) {
        return false
    }
}