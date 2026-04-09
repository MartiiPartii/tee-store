"use server"

import { transporter } from "@/lib/email"
import { createAuthorizationToken, getUserId, verifyToken } from "@/lib/jwt/token"
import { logServerError } from "@/lib/logger"
import { createValidationToken } from "@/lib/jwt/validation-token"
import { prisma } from "@/lib/prisma"
import { decodeUidb, generateUidb } from "@/lib/validation/uidb"
import { UserProfile } from "@/types/profile"
import bcrypt from "bcrypt"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const login = async (prevState: any, formData: FormData) => {
    try {
        const email = formData.get("email") as string | undefined
        const password = formData.get("password") as string | undefined

        if(!email || !password) {
            return { 
                error: "All fields are required."
            }
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if(!user) {
            return {
                error: "Invalid email."
            }
        }

        if(!user.verified) {
            return { 
                error: "Your account is not verified. Check your email." 
            }
        }

        const validPass = await bcrypt.compare(password, user.password)
        if(!validPass) {
            return {
                error: "Invalid password"
            }
        }

        const token = await createAuthorizationToken(user.id);
        
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        })

    } catch (err) {
        logServerError("login:unexpected_failure", err)
        return {
            error: "Something went wrong. Please try again."
        }
    }
    
    redirect('/browse')
}


export const register = async (prevState: any, formData: FormData) => {
    try {
        const firstName = formData.get("firstName") as string | undefined
        const lastName = formData.get("lastName") as string | undefined
        const email = formData.get("email") as string | undefined
        const password = formData.get("password") as string | undefined
        const confirmPassword = formData.get("confirmPassword") as string | undefined
        const address = formData.get("address") as string | undefined
        const phoneNumber = formData.get("phoneNumber") as string | undefined

        if(!firstName || !lastName || !email || !password || !confirmPassword || !address || !phoneNumber) {
            return {
                error: "All fields are required."
            }
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        
        if(existingUser) {
            return {
                error: "User with this email already exists."
            }
        }

        if(password !== confirmPassword) {
            return {
                error: "Passwords must match."
            }
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: { email, firstName, lastName, password: hashedPass, address, phoneNumber }
        })

        try {
            const token = await createValidationToken(newUser.id)
            const uidb = generateUidb(newUser.id)
            await transporter.sendMail({
                from: "teestoreht@resend.dev",
                to: email,
                subject: "Account Verification",
                html: `<div><h1>Hi ${firstName}! Welcome to TeeStore.</h1><h3>Click the link below to verify your account and start using our platform:</h3><a href="${process.env.NEXT_PUBLIC_URL}/verify/${uidb}/${token}">Click to verify</a></div>`
            })
        } catch (err) {
            logServerError("register:verification_email_failed", err, {
                userId: newUser.id,
                email
            })
            try {
                await prisma.verificationToken.deleteMany({ where: { userId: newUser.id } })
                await prisma.user.delete({ where: { id: newUser.id } })
            } catch (cleanupErr) {
                logServerError("register:rollback_after_email_failure_failed", cleanupErr, {
                    userId: newUser.id
                })
            }
            return {
                error: "We couldn't send the verification email. Please try again."
            }
        }
    } catch (error) {
        logServerError("register:unexpected_failure", error)

        return {
            error: "Something went wrong. Please try again."
        }
    }

    redirect('/verify')
}

export const verifyAccount = async (uidb: string, token: string) => {
    if(!uidb || !token) throw new Error("Please provide a valid link.")
        
    const userId = Number(decodeUidb(uidb))
    if(!userId) throw new Error("Please provide a valid link.")

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if(!user) throw new Error("The user you're trying to verify does not exist.")

    if(user.verified) throw new Error("The user is already verified.")

    const tokenObj = await prisma.verificationToken.findUnique({
        where: { token }
    })

    if(!tokenObj) throw new Error("The user has no verification token.")

    if(tokenObj.userId !== userId) throw new Error("Wrong verification token.")

    try {
        await verifyToken(token, process.env.JWT_VALIDATION_SECRET!)
    } catch (err) {
        logServerError("verifyAccount:invalid_or_expired_token", err, { userId })
        await prisma.verificationToken.delete({ where: { id: tokenObj.id } })
        await prisma.user.delete({ where: { id: userId } })
        throw new Error("Verification token expired.")
    }

    const verifiedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            verified: true
        }
    })
    const deletedToken = await prisma.verificationToken.delete({ where: { id: tokenObj.id } })
}

export const logOut = async () => {
    revalidatePath("/", "layout")
    const cookieStore = await cookies()
    cookieStore.delete("token");
    
    redirect("/login")
}

export const getAccount = async () => {
    const userId = await getUserId() as number
    
    let user: UserProfile | null = null
    let shirts: number | null = 0
    let profit: number = 0
    let orders: number = 0
    let error: string | null = null
    try {
        if(!userId) throw new Error()
        user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if(!user) throw new Error()

        shirts = await prisma.shirt.count({
            where: { sellerId: userId }
        })

        orders = await prisma.order.count({
            where: { userId }
        })

        const sales = await prisma.order.findMany({
            where: {
                item: {
                    sellerId: userId
                }
            },
            select: {
                item: {
                    select: {
                        price: true
                    }
                }
            }
        })
        const prices = sales.map(sale => sale.item.price)
        profit = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    } catch (err) {
        logServerError("getAccount:fetch_failed", err, { userId })
        error = "We couldn't get your profile data. Please try again."
    }

    return {
        user,
        shirts,
        profit,
        orders,
        error,
    }
}