"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { User } from "lucide-react"
import SearchForm from "./SearchForm"
import MobileMenu from "./MobileMenu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b border-border bg-brand-bg transition-transform duration-200 ease-out",
          navVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-2 px-4 sm:gap-8 md:gap-12 lg:gap-24 sm:px-6 min-h-14 sm:min-h-16">
          <Link href="/">
            <span className="text-[1.2rem] font-bold text-primary">TeeStore</span>
          </Link>

          <SearchForm />

          <div className="hidden items-end justify-end gap-2 sm:flex sm:flex-row">
            <Button variant="ghost" asChild>
              <Link href="/browse">Browse</Link>
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/sell-tshirt">Sell</Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/profile" aria-label="Profile">
                    <User className="size-6 text-brand-text" />
                  </Link>
                </Button>
              </>
            ) : (
              <Button variant="default" asChild>
                <Link href="/register">Join now</Link>
              </Button>
            )}
          </div>

          <MobileMenu isAuthenticated={isAuthenticated} />
        </div>
      </header>
      {!isHome && <div className="min-h-14 sm:min-h-16" aria-hidden />}
    </>
  )
}

export default HeaderClient
