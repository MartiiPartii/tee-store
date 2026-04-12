"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BROWSE_SORT_OPTIONS,
  buildBrowseClearFiltersPath,
  buildBrowsePath,
  browseHasActiveFilters,
  type BrowsePrice,
  type BrowseSort,
  type BrowseSource,
} from "@/lib/browse-params"
import { pillButtonClass } from "@/lib/site-ui"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SOURCE_OPTIONS: { value: BrowseSource; label: string }[] = [
  { value: "all", label: "All" },
  { value: "store", label: "Store" },
  { value: "community", label: "Community" },
]

const PRICE_OPTIONS: { value: BrowsePrice; label: string }[] = [
  { value: "all", label: "Any price" },
  { value: "under-25", label: "Under $25" },
  { value: "25-50", label: "$25 – $50" },
  { value: "50-plus", label: "$50+" },
]

function pillClass(active: boolean) {
  return cn(
    pillButtonClass,
    active
      ? "border-primary bg-primary/[0.06] text-primary"
      : "text-brand-muted"
  )
}

export default function BrowseToolbar() {
  const router = useRouter()
  const sp = useSearchParams()
  const qs = sp.toString()

  const currentSource = (sp.get("source") as BrowseSource) || "all"
  const safeSource: BrowseSource =
    currentSource === "store" || currentSource === "community"
      ? currentSource
      : "all"

  const currentSortRaw = sp.get("sort") || "newest"
  const sortNormalized: BrowseSort = BROWSE_SORT_OPTIONS.some(
    (o) => o.value === currentSortRaw
  )
    ? (currentSortRaw as BrowseSort)
    : "newest"
  const currentPrice = (sp.get("price") as BrowsePrice) || "all"
  const safePrice: BrowsePrice =
    currentPrice === "under-25" ||
    currentPrice === "25-50" ||
    currentPrice === "50-plus"
      ? currentPrice
      : "all"

  const showClear = browseHasActiveFilters(sp)

  return (
    <div className="mb-10 flex flex-col gap-8 border-b border-border pb-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="min-w-0 flex-1 space-y-6">
          <fieldset>
            <legend className="ui-section-label mb-3 block">Listing type</legend>
            <div className="flex flex-wrap gap-2">
              {SOURCE_OPTIONS.map(({ value, label }) => {
                const active =
                  value === "all"
                    ? safeSource === "all"
                    : safeSource === value
                const href =
                  value === "all"
                    ? buildBrowsePath(qs, { source: null })
                    : buildBrowsePath(qs, { source: value })
                return (
                  <Link
                    key={value}
                    href={href}
                    className={pillClass(active)}
                    aria-pressed={active}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="ui-section-label mb-3 block">Price</legend>
            <div className="flex flex-wrap gap-2">
              {PRICE_OPTIONS.map(({ value, label }) => {
                const active =
                  value === "all"
                    ? safePrice === "all"
                    : safePrice === value
                const href =
                  value === "all"
                    ? buildBrowsePath(qs, { price: null })
                    : buildBrowsePath(qs, { price: value })
                return (
                  <Link
                    key={value}
                    href={href}
                    className={pillClass(active)}
                    aria-pressed={active}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-60 lg:shrink-0">
          <Label htmlFor="browse-sort" className="ui-section-label">
            Sort by
          </Label>
          <Select
            value={sortNormalized}
            onValueChange={(value) => {
              router.push(
                buildBrowsePath(qs, {
                  sort: value === "newest" ? null : value,
                })
              )
            }}
          >
            <SelectTrigger id="browse-sort" className="rounded-full bg-brand-bg">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {BROWSE_SORT_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {showClear ? (
        <p className="text-sm text-brand-muted">
          <Link
            href={buildBrowseClearFiltersPath(qs)}
            className="font-medium text-primary underline-offset-4 transition-colors hover:underline"
          >
            Clear filters
          </Link>
          <span className="text-brand-muted">
            {" "}
            — reset listing type, price, and sort (search stays in the header)
          </span>
        </p>
      ) : null}
    </div>
  )
}
