import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    if(!email || !password) {
        return NextResponse.json(
            { error: "All fields are required." },
            { status: 400 }
        )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if(!user) {
        return NextResponse.json(
            { error: "Invalid email." },
            { status: 400 }
        )
    }

    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass) {
        return NextResponse.json(
            { error: "Invalid password" },
            { status: 400 }
        )
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "168h"
    });

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
    })

    return NextResponse.json(
        { message: "Login successful." },
        { status: 200 }
    )
}