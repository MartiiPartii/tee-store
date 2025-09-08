import jwt from "jsonwebtoken"
import { prisma } from "../prisma"

export async function createToken(userId: number) {
    const token = await jwt.sign({ userId }, process.env.JWT_VALIDATION_SECRET!, {
        expiresIn: 900 //15min
        // expiresIn: 5
    })

    const tokenObj = await prisma.verificationToken.create({
        data: { token, userId }
    })

    return token
}

export async function isExpired(token: string) {
    try {
        
    } catch(err) {
        // console.log(err)
    }
}