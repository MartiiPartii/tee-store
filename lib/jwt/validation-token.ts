import { prisma } from "../prisma"
import { createToken } from "./token"

export async function createValidationToken(userId: number) {
    const token = await createToken(userId, process.env.JWT_VALIDATION_SECRET!, "15m")

    await prisma.verificationToken.create({
        data: { token, userId }
    })

    return token
}
