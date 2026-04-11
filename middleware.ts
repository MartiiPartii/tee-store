import { NextRequest, NextResponse } from "next/server"
import { isAuth } from "./lib/authentication/authenticate"

function isProtectedPath(path: string): boolean {
  if (path === "/profile" || path.startsWith("/profile/")) return true
  return /^\/shirt\/[^/]+\/purchase$/.test(path)
}

function isAuthPage(path: string): boolean {
  if (path === "/login" || path === "/register") return true
  if (path === "/verify" || path.startsWith("/verify/")) return true
  return false
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isAuthenticated = await isAuth(req)

  if (isProtectedPath(path) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isAuthPage(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", req.url))
  }

  return NextResponse.next()
}
