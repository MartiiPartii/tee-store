import { decodeUidb } from "@/lib/validation/uidb"
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/jwt/token"

export async function PATCH(req: NextRequest) {
    try {
            const { uidb, token } = await req.json()

            if(!uidb || !token) {
                return NextResponse.json(
                    { error: "Please provide UIDB and token." },
                    { status: 400 }
                )
            }

            const userId = Number(decodeUidb(uidb))

            const user = await prisma.user.findUnique({ where: { id: userId } })

            if(!user) {
                return NextResponse.json(
                    { error: "The user you're trying to verify does not exist." },
                    { status: 400 }
                )
            }

            if(user.verified) {
                return NextResponse.json(
                    { error: "The user is already verified." },
                    { status: 400 }
                )
            }

            const tokenObj = await prisma.verificationToken.findUnique({
                where: { token }
            })

            if(!tokenObj) {
                return NextResponse.json(
                    { error: "The user has no verification token." },
                    { status: 400 }
                )
            }

            if(tokenObj.userId !== userId) {
                return NextResponse.json(
                    { error: "Wrong verification token." },
                    { status: 400 }
                )
            }

            try {
                const decoded = await verifyToken(token, process.env.JWT_VALIDATION_SECRET!)
            } catch(err) {
                const deletedToken = await prisma.verificationToken.delete({ where: { id: tokenObj.id } })
                const deletedUser = await prisma.user.delete({ where: { id: userId } })
                return NextResponse.json(
                    { error: "Verification token expired." },
                    { status: 400 }
                )
            }

            const verifiedUser = await prisma.user.update({
                where: { id: user.id },
                data: {
                    verified: true
                }
            })
            const deletedToken = await prisma.verificationToken.delete({ where: { id: tokenObj.id } })

            return NextResponse.json(
                { message: "User verified successfully" },
                { status: 200 }
            )
    } catch(error) {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        )
    }
}