import type { Prisma } from "@/app/generated/prisma"

export type BrowseSource = "all" | "store" | "community"
export type BrowseSort = "newest" | "oldest" | "name" | "price-asc" | "price-desc"
export type BrowsePrice = "all" | "under-25" | "25-50" | "50-plus"

export const BROWSE_SORT_OPTIONS: { value: BrowseSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
]

/** Parse Next.js `searchParams` for the browse page. */
export function parseBrowseSearchParams(
  raw: Record<string, string | string[] | undefined>
): {
  search: string
  source: BrowseSource
  sort: BrowseSort
  price: BrowsePrice
} {
  const rawSearch = typeof raw.search === "string" ? raw.search : ""
  let search = ""
  try {
    search = decodeURIComponent(rawSearch).trim()
  } catch {
    search = rawSearch.trim()
  }

  const src = typeof raw.source === "string" ? raw.source : ""
  const source: BrowseSource =
    src === "store" ? "store" : src === "community" ? "community" : "all"

  const sortRaw = typeof raw.sort === "string" ? raw.sort : ""
  const sort: BrowseSort =
    sortRaw === "oldest" ||
    sortRaw === "name" ||
    sortRaw === "price-asc" ||
    sortRaw === "price-desc"
      ? sortRaw
      : "newest"

  const priceRaw = typeof raw.price === "string" ? raw.price : ""
  const price: BrowsePrice =
    priceRaw === "under-25" || priceRaw === "25-50" || priceRaw === "50-plus"
      ? priceRaw
      : "all"

  return { search, source, sort, price }
}

export function sourceToSoldByPlatform(
  source: BrowseSource
): boolean | undefined {
  if (source === "store") return true
  if (source === "community") return false
  return undefined
}

export function browseShirtOrderBy(
  sort: BrowseSort
): Prisma.ShirtOrderByWithRelationInput {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" }
    case "name":
      return { name: "asc" }
    case "price-asc":
      return { price: "asc" }
    case "price-desc":
      return { price: "desc" }
    default:
      return { createdAt: "desc" }
  }
}

export function browsePriceWhere(
  price: BrowsePrice
): Prisma.FloatFilter | undefined {
  switch (price) {
    case "under-25":
      return { lt: 25 }
    case "25-50":
      return { gte: 25, lt: 50 }
    case "50-plus":
      return { gte: 50 }
    default:
      return undefined
  }
}

function normalizeBrowseParamsInPlace(p: URLSearchParams) {
  if (p.get("source") === "all") p.delete("source")
  if (p.get("sort") === "newest") p.delete("sort")
  if (p.get("price") === "all") p.delete("price")
  const s = p.get("search")
  if (s === null || s.trim() === "") p.delete("search")
}

/**
 * Merge `patch` into the current browse query string. Use `null` to remove a key.
 * Drops default values so URLs stay short.
 */
export function buildBrowsePath(
  currentQueryString: string,
  patch: Partial<Record<"search" | "source" | "sort" | "price", string | null>>
): string {
  const p = new URLSearchParams(currentQueryString)
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue
    if (v === null || v === "") p.delete(k)
    else p.set(k, v)
  }
  normalizeBrowseParamsInPlace(p)
  const s = p.toString()
  return s ? `/browse?${s}` : "/browse"
}

export function browseHasActiveFilters(sp: URLSearchParams): boolean {
  return !!(
    sp.get("source") ||
    (sp.get("sort") && sp.get("sort") !== "newest") ||
    (sp.get("price") && sp.get("price") !== "all")
  )
}

/** Remove source, sort, and price only (keeps search). */
export function buildBrowseClearFiltersPath(currentQueryString: string): string {
  const p = new URLSearchParams(currentQueryString)
  p.delete("source")
  p.delete("sort")
  p.delete("price")
  normalizeBrowseParamsInPlace(p)
  const s = p.toString()
  return s ? `/browse?${s}` : "/browse"
}
