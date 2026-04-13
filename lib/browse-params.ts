import type { Prisma } from "@/app/generated/prisma"

export type BrowseSource = "all" | "store" | "community"
export type BrowseSort = "newest" | "oldest" | "name" | "price-asc" | "price-desc"
export type BrowsePrice = "all" | "under-25" | "25-50" | "50-plus"
export type BrowsePerPage = 30 | 60 | 90

export const BROWSE_PER_PAGE_OPTIONS: { value: BrowsePerPage; label: string }[] = [
  { value: 30, label: "30 per page" },
  { value: 60, label: "60 per page" },
  { value: 90, label: "90 per page" },
]

export const BROWSE_SORT_OPTIONS: { value: BrowseSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name", label: "Name A–Z" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
]

/** Main heading and intro line on /browse for the active listing type filter. */
export function browseCatalogHero(source: BrowseSource): {
  title: string
  lead: string
} {
  switch (source) {
    case "store":
      return {
        title: "Studio collection",
        lead:
          "Hand-picked designs from the TeeStore studio — limited runs and timeless staples.",
      }
    case "community":
      return {
        title: "Community listings",
        lead:
          "Tees from independent artists and sellers — browse the community marketplace.",
      }
    default:
      return {
        title: "All T-Shirts",
        lead:
          "Browse the full marketplace — studio picks and designs from independent sellers.",
      }
  }
}

function parseBrowsePage(raw: Record<string, string | string[] | undefined>): number {
  const s = typeof raw.page === "string" ? raw.page : ""
  const n = parseInt(s, 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return n
}

function parseBrowsePerPage(
  raw: Record<string, string | string[] | undefined>
): BrowsePerPage {
  const s = typeof raw.perPage === "string" ? raw.perPage : ""
  if (s === "60") return 60
  if (s === "90") return 90
  return 30
}

/** Serialize `searchParams` from a Next.js page (for redirects and link bases). */
export function rawSearchParamsToQueryString(
  raw: Record<string, string | string[] | undefined>
): string {
  const p = new URLSearchParams()
  for (const [key, val] of Object.entries(raw)) {
    if (val === undefined) continue
    if (Array.isArray(val)) {
      for (const v of val) p.append(key, v)
    } else {
      p.set(key, val)
    }
  }
  return p.toString()
}

/** Parse Next.js `searchParams` for the browse page. */
export function parseBrowseSearchParams(
  raw: Record<string, string | string[] | undefined>
): {
  search: string
  source: BrowseSource
  sort: BrowseSort
  price: BrowsePrice
  page: number
  perPage: BrowsePerPage
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

  return {
    search,
    source,
    sort,
    price,
    page: parseBrowsePage(raw),
    perPage: parseBrowsePerPage(raw),
  }
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
  if (p.get("page") === "1") p.delete("page")
  if (p.get("perPage") === "30") p.delete("perPage")
  const s = p.get("search")
  if (s === null || s.trim() === "") p.delete("search")
}

/**
 * Merge `patch` into the current browse query string. Use `null` to remove a key.
 * Drops default values so URLs stay short.
 */
export function buildBrowsePath(
  currentQueryString: string,
  patch: Partial<
    Record<
      "search" | "source" | "sort" | "price" | "page" | "perPage",
      string | null
    >
  >
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
  p.delete("page")
  normalizeBrowseParamsInPlace(p)
  const s = p.toString()
  return s ? `/browse?${s}` : "/browse"
}
