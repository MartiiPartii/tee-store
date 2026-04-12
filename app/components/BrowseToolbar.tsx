"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  BROWSE_SORT_OPTIONS,
  buildBrowseClearFiltersPath,
  buildBrowsePath,
  browseHasActiveFilters,
  type BrowsePrice,
  type BrowseSort,
  type BrowseSource,
} from "@/lib/browse-params"
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

const selectTriggerClass = "w-full rounded-full border-border bg-brand-bg"

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
    <div className="mb-10 pt-8 flex flex-col gap-8 border-b border-border pb-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-8">
        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="browse-source" className="ui-section-label">
            Listing type
          </Label>
          <Select
            value={safeSource}
            onValueChange={(value) => {
              router.push(
                buildBrowsePath(qs, {
                  source: value === "all" ? null : value,
                })
              )
            }}
          >
            <SelectTrigger id="browse-source" className={selectTriggerClass}>
              <SelectValue placeholder="Listing type" />
            </SelectTrigger>
            <SelectContent>
              {SOURCE_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <Label htmlFor="browse-price" className="ui-section-label">
            Price
          </Label>
          <Select
            value={safePrice}
            onValueChange={(value) => {
              router.push(
                buildBrowsePath(qs, {
                  price: value === "all" ? null : value,
                })
              )
            }}
          >
            <SelectTrigger id="browse-price" className={selectTriggerClass}>
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-1">
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
            <SelectTrigger id="browse-sort" className={selectTriggerClass}>
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
