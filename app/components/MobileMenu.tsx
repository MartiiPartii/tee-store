"use client"

import { Menu } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const MobileMenu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-6 text-brand-text" />
        </Button>
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
          <div className="flex flex-col gap-1 px-8 py-8">
            <p className="mb-2 text-[1.2rem] font-bold text-brand-text">TeeStore</p>

            <Link
              href="/browse"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-base text-primary transition-colors hover:text-primary/80"
              )}
            >
              Browse
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/sell-tshirt"
                  onClick={() => setIsOpen(false)}
                  className="text-base text-primary transition-colors hover:text-primary/80"
                >
                  Sell
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-base text-primary transition-colors hover:text-primary/80"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="text-base text-primary transition-colors hover:text-primary/80"
              >
                Join now
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileMenu
