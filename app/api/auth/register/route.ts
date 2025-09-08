import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
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
        
        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        )
    }
}