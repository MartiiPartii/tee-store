import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { transporter } from "@/lib/email"
import { createValidationToken } from "@/lib/jwt/token"
import { generateUidb } from "@/lib/validation/uidb"

export async function POST(req: NextRequest) {
    try {
        const { firstName, lastName, email, password, confirmPassword, address, phoneNumber } = await req.json()

        if(!firstName || !lastName || !email || !password || !confirmPassword || !address || !phoneNumber) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({ where: { email } })
        
        if(existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists." },
                { status: 400 }
            )
        }

        if(password !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords must match." },
                { status: 400 }
            )
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: { email, firstName, lastName, password: hashedPass, address, phoneNumber }
        })

        try {
            const token = await createValidationToken(newUser.id)
            const uidb = generateUidb(newUser.id)
            const info = await transporter.sendMail({
                from: "teestoreht@gmail.com",
                to: email,
                subject: "Account Verification",
                html: `<div><h1>Hi ${firstName}! Welcome to TeeStore.</h1><h3>Click the link below to verify your account and start using our platform:</h3><a href="http://localhost:3000/verify/${uidb}/${token}">Click to verify</a></div>`
            })
        } catch(err) {
            const deletedUser = await prisma.user.delete({
                where: { id: newUser.id }
            })
            throw err
        }
        
        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        )
    }
}