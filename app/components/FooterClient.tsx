"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import { navLinkClass as linkClass } from "@/lib/site-ui"

const socialPlaceholders = [
  { label: "Twitter", href: "", Icon: Twitter },
  { label: "Instagram", href: "", Icon: Instagram },
  { label: "Facebook", href: "", Icon: Facebook },
] as const

const FooterClient = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-brand-surface">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <span className="text-lg font-semibold tracking-tight text-primary">
                TeeStore
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-muted">
              A calm marketplace for unique tees — discover designs from
              independent creators or list your own.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5"
            aria-label="Footer"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Shop
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link href="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className={linkClass}>
                    Browse
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Selling
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link href="/profile/sell-tshirt" className={linkClass}>
                    Sell a T-shirt
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Account
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link href="/login" className={linkClass}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className={linkClass}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className={linkClass}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/profile/my-shirts" className={linkClass}>
                    My T-shirts
                  </Link>
                </li>
                <li>
                  <Link href="/profile/orders" className={linkClass}>
                    Orders
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Social
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialPlaceholders.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href || "#"}
                    aria-label={label}
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-full border border-border bg-brand-bg text-brand-muted transition-colors",
                      href
                        ? "hover:border-primary hover:text-primary"
                        : "cursor-default opacity-70"
                    )}
                    onClick={
                      href
                        ? undefined
                        : (e) => {
                            e.preventDefault()
                          }
                    }
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-brand-muted">
            © {year} TeeStore. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted">
            Crafted for makers and wearers of great tees.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterClient
