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
import { iconCircleButtonClass, navLinkClass, pillButtonClass } from "@/lib/site-ui"

const MobileMenu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex sm:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className={cn(iconCircleButtonClass, "shrink-0")}
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
                      className={pillButtonClass}
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
