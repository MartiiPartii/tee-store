"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { User } from "lucide-react"
import SearchForm from "./SearchForm"
import MobileMenu from "./MobileMenu"
import { cn } from "@/lib/utils"
import { iconCircleButtonClass, navLinkClass, pillButtonClass } from "@/lib/site-ui"

const HEADER_SCROLL_THRESHOLD = 8

type Props = {
  isAuthenticated: boolean
}

const HeaderClient = ({ isAuthenticated }: Props) => {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [homeScrollNav, setHomeScrollNav] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const update = () => setHomeScrollNav(window.scrollY > HEADER_SCROLL_THRESHOLD)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [isHome])

  const navVisible = !isHome || homeScrollNav

  const linkActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b border-border bg-brand-surface transition-transform duration-200 ease-out",
          navVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          {/* Mobile: menu row + full-width search row */}
          <div className="flex flex-col gap-3 py-3 sm:hidden">
            <div className="relative flex items-center justify-between gap-3">
              <MobileMenu isAuthenticated={isAuthenticated} />
              <Link
                href="/"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="text-lg font-semibold tracking-tight text-primary">
                  TeeStore
                </span>
              </Link>
              <div className="size-10 shrink-0" aria-hidden />
            </div>
            <Suspense
              fallback={
                <div className="h-9 w-full animate-pulse rounded-full bg-brand-bg" />
              }
            >
              <SearchForm fullWidth iconEnd />
            </Suspense>
          </div>

          {/* sm+: single toolbar row */}
          <div className="hidden items-center gap-4 py-4 sm:flex sm:gap-8 md:gap-10">
            <Link href="/" className="shrink-0">
              <span className="text-lg font-semibold tracking-tight text-primary">
                TeeStore
              </span>
            </Link>

            <Suspense
              fallback={
                <div className="h-9 w-full max-w-md flex-1 animate-pulse rounded-full bg-brand-bg" />
              }
            >
              <SearchForm />
            </Suspense>

            <nav
              className="flex shrink-0 items-center gap-6"
              aria-label="Main"
            >
              <Link
                href="/browse"
                className={cn(
                  navLinkClass,
                  linkActive("/browse") && "text-primary"
                )}
              >
                Browse
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile/sell-tshirt"
                    className={cn(
                      navLinkClass,
                      linkActive("/profile/sell-tshirt") && "text-primary"
                    )}
                  >
                    Sell
                  </Link>
                  <Link
                    href="/profile"
                    aria-label="Profile"
                    className={cn(
                      iconCircleButtonClass,
                      (pathname === "/profile" ||
                        pathname.startsWith("/profile/")) &&
                        "border-primary text-primary"
                    )}
                  >
                    <User className="size-[18px]" aria-hidden />
                  </Link>
                </>
              ) : (
                <Link href="/register" className={pillButtonClass}>
                  Join now
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      {!isHome && (
        <div
          className="min-h-[7rem] sm:min-h-[4.75rem]"
          aria-hidden
        />
      )}
    </>
  )
}

export default HeaderClient
