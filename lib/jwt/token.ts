import { jwtVerify, SignJWT } from "jose"
import { prisma } from "../prisma"

async function createToken(userId: number, secret: string, exp: number | string | Date) {
    const key = new TextEncoder().encode(secret)
    
    const token = await new SignJWT({
        userId
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(key)


    return token
}

export async function verifyToken(token: string, secret: string) {
    const key = new TextEncoder().encode(secret)

    const { payload } = await jwtVerify(token, key, {
        algorithms: ["HS256"]
    })

    return payload
}

export async function createValidationToken(userId: number) {
    const token = await createToken(userId, process.env.JWT_VALIDATION_SECRET!, "15m")

    const tokenObj = await prisma.verificationToken.create({
        data: { token, userId }
    })

    return token
}

export async function createAuthorizationToken(userId: number) {
    const token = await createToken(userId, process.env.JWT_SECRET!, "168h")

    return token
}