import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "./lib/authentication/authenticate";

const protectedRoutes = ['/profile', '/my-shirts', '/orders', '/orders/[id]', '/sell-tshirt', '/shirt/[id]/purchase']
const reverseProtectedRoutes = ['/login', '/register', '/verify', '/verify/[uidb]/[token]']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedPage = protectedRoutes.includes(path)
    const isReverseProtectedPage = reverseProtectedRoutes.includes(path)

    const isAuthenticated = await isAuth(req)
    
    if(isProtectedPage && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if(isReverseProtectedPage && isAuthenticated) {
        return NextResponse.redirect(new URL('/profile', req.url))
    }

    return NextResponse.next()
}