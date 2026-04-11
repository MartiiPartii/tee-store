"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { buildBreadcrumbs } from "@/lib/breadcrumb"
import { cn } from "@/lib/utils"

export default function BreadcrumbBar() {
  const pathname = usePathname()
  const items = buildBreadcrumbs(pathname)

  if (!items || items.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-brand-bg">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-3 sm:px-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={`${item.href}-${index}`} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="size-3.5 shrink-0 text-brand-muted opacity-70"
                    strokeWidth={2}
                    aria-hidden
                  />
                )}
                {isLast ? (
                  <span className="font-medium text-primary" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-brand-muted transition-colors hover:text-primary",
                      "underline-offset-4 hover:underline"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
