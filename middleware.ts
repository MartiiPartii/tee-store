import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "./lib/authentication/authenticate";

const protectedPostRoutes = ['/api/store/shirt']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtected = (protectedPostRoutes.includes(path) && req.method === "POST")

    const isAuthenticated = await isAuth(req)

    if(isProtected && !isAuthenticated) {
        return NextResponse.json(
            { message: "You need to log in to perform this operation" },
            { status: 401 }
        )
    }

    return NextResponse.next()
}