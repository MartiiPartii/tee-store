import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buildBrowsePath } from "@/lib/browse-params"
import { cn } from "@/lib/utils"

/** Page numbers with ellipsis for large totals (always includes 1 and last). */
function getPaginationRange(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = new Set<number>()
  pages.add(1)
  pages.add(total)
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) pages.add(i)
  }
  const sorted = [...pages].sort((a, b) => a - b)
  const out: (number | "ellipsis")[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      out.push("ellipsis")
    }
    out.push(sorted[i])
  }
  return out
}

function pageHref(queryString: string, pageNum: number) {
  return buildBrowsePath(queryString, {
    page: pageNum <= 1 ? null : String(pageNum),
  })
}

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

  const pageItems = getPaginationRange(page, totalPages)

  const pageButtonClass = cn(
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium tabular-nums transition-colors",
    "border-border bg-brand-bg hover:bg-primary/[0.06]"
  )
  const pageButtonCurrentClass = cn(
    "inline-flex h-10 min-w-10 cursor-default items-center justify-center rounded-full border px-3 text-sm font-semibold tabular-nums",
    "border-primary bg-primary/[0.08] text-primary"
  )

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
        <div className="flex flex-wrap items-center justify-center gap-2">
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
          <ul
            className="flex flex-wrap items-center justify-center gap-1.5"
            aria-label={`Page ${page} of ${totalPages}`}
          >
            {pageItems.map((item, idx) =>
              item === "ellipsis" ? (
                <li
                  key={`ellipsis-${idx}`}
                  className="flex h-10 min-w-8 items-center justify-center px-1 text-sm text-brand-muted"
                  aria-hidden
                >
                  …
                </li>
              ) : item === page ? (
                <li key={item}>
                  <span className={pageButtonCurrentClass} aria-current="page">
                    {item}
                  </span>
                </li>
              ) : (
                <li key={item}>
                  <Link href={pageHref(queryString, item)} className={pageButtonClass}>
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
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
