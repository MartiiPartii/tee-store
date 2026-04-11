"use client"

import { Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinkClass =
  "text-sm text-brand-muted transition-colors hover:text-primary"

const MobileMenu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex sm:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-brand-bg text-brand-muted transition-colors hover:border-primary hover:text-primary"
        >
          <Menu className="size-[18px]" aria-hidden />
        </button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[min(100%,20rem)] border-r border-border bg-brand-surface p-0 sm:max-w-sm"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 px-8 py-10">
            <div>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold tracking-tight text-primary"
              >
                TeeStore
              </Link>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Menu
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link
                    href="/browse"
                    onClick={() => setIsOpen(false)}
                    className={navLinkClass}
                  >
                    Browse
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link
                        href="/sell-tshirt"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                      >
                        Sell
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className={navLinkClass}
                      >
                        Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "inline-flex rounded-full border border-border bg-brand-bg px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:bg-primary/[0.06]"
                      )}
                    >
                      Join now
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileMenu
