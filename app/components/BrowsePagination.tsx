import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buildBrowsePath } from "@/lib/browse-params"
import { cn } from "@/lib/utils"

type BrowsePaginationProps = {
  page: number
  totalPages: number
  total: number
  perPage: number
  queryString: string
}

export default function BrowsePagination({
  page,
  totalPages,
  total,
  perPage,
  queryString,
}: BrowsePaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * perPage + 1
  const to = Math.min(page * perPage, total)

  const prevHref =
    page <= 1
      ? null
      : buildBrowsePath(queryString, {
          page: page - 1 <= 1 ? null : String(page - 1),
        })
  const nextHref =
    page >= totalPages
      ? null
      : buildBrowsePath(queryString, { page: String(page + 1) })

  return (
    <nav
      className="mt-12 flex flex-col items-stretch gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Catalog pagination"
    >
      <p className="text-center text-sm text-brand-muted sm:text-left">
        Showing{" "}
        <span className="font-medium text-primary">
          {from}&ndash;{to}
        </span>{" "}
        of{" "}
        <span className="font-medium text-primary">{total}</span> listings
      </p>
      {totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {prevHref ? (
            <Link
              href={prevHref}
              className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-brand-bg px-4 text-sm font-medium transition-colors hover:bg-primary/[0.06]"
              )}
            >
              <ChevronLeft className="size-4 shrink-0" aria-hidden />
              Previous
            </Link>
          ) : (
            <span
              className="inline-flex h-10 cursor-not-allowed items-center gap-1.5 rounded-full border border-border/50 bg-brand-bg/50 px-4 text-sm font-medium text-brand-muted opacity-60"
              aria-disabled
            >
              <ChevronLeft className="size-4 shrink-0" aria-hidden />
              Previous
            </span>
          )}
          <span className="min-w-[5.5rem] text-center text-sm tabular-nums text-brand-muted">
            Page {page} of {totalPages}
          </span>
          {nextHref ? (
            <Link
              href={nextHref}
              className={cn(
                "inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-brand-bg px-4 text-sm font-medium transition-colors hover:bg-primary/[0.06]"
              )}
            >
              Next
              <ChevronRight className="size-4 shrink-0" aria-hidden />
            </Link>
          ) : (
            <span
              className="inline-flex h-10 cursor-not-allowed items-center gap-1.5 rounded-full border border-border/50 bg-brand-bg/50 px-4 text-sm font-medium text-brand-muted opacity-60"
              aria-disabled
            >
              Next
              <ChevronRight className="size-4 shrink-0" aria-hidden />
            </span>
          )}
        </div>
      ) : null}
    </nav>
  )
}
