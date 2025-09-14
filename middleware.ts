import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "./lib/authentication/authenticate";

const protectedPostRoutes = ['/api/store/shirt']
const protectedRoutes = ['/profile', '/my-shirts', '/orders', '/orders/[id]', '/sell-tshirt', '/shirt/[id]/purchase']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedApi = (protectedPostRoutes.includes(path) && req.method === "POST")
    const isProtectedPage = protectedRoutes.includes(path)

    const isAuthenticated = await isAuth(req)

    if(isProtectedApi && !isAuthenticated) {
        return NextResponse.json(
            { message: "You need to log in to perform this operation" },
            { status: 401 }
        )
    }
    if(isProtectedPage && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
}