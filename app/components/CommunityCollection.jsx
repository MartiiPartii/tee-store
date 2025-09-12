import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { redirect } from "next/navigation"

const CommunityCollection = async () => {
    const cookieStore = await cookies()
    const token = await cookies.get("token")

    try {
        const user = verifyToken(token)
        console.log(user)
    } catch(err) {
        redirect("/login")
    }

    return (
        <>CommunityCollection</>
    )
}

export default CommunityCollection