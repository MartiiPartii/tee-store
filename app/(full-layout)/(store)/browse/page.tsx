import { Suspense } from "react"
import { redirect } from "next/navigation"
import BrowsePagination from "@/app/components/BrowsePagination"
import BrowseToolbar from "@/app/components/BrowseToolbar"
import SectionContainer from "@/app/components/SectionContainer"
import StoreCollection from "@/app/components/StoreCollection"
import { countShirts, getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"
import {
  buildBrowsePath,
  parseBrowseSearchParams,
  rawSearchParamsToQueryString,
  sourceToSoldByPlatform,
} from "@/lib/browse-params"
import type { CatalogShirt } from "@/types/shirt"

const Browse = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
  const raw = await searchParams
  const { search, source, sort, price, page, perPage } =
    parseBrowseSearchParams(raw)
  const queryString = rawSearchParamsToQueryString(raw)
  let collection: CatalogShirt[] | null = null
  let total = 0
  let error: string | null = null

  try {
    const soldBy = sourceToSoldByPlatform(source)
    const [items, count] = await Promise.all([
      getShirts({
        searchQuery: search || undefined,
        soldByPlatform: soldBy,
        sort,
        priceFilter: price,
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      countShirts({
        searchQuery: search || undefined,
        soldByPlatform: soldBy,
        priceFilter: price,
      }),
    ])
    collection = items
    total = count
  } catch (err) {
    logServerError("browse:get_shirts_failed", err, {
      search,
      source,
      sort,
      price,
      page,
      perPage,
    })
    error = "We couldn't fetch products properly. Please try again."
  }

  if (!error && total > 0) {
    const totalPages = Math.max(1, Math.ceil(total / perPage))
    if (page > totalPages) {
      redirect(
        buildBrowsePath(queryString, {
          page: totalPages <= 1 ? null : String(totalPages),
        })
      )
    }
  }

  return (
    <>
      <SectionContainer
        props={{
          className:
            "pb-12 pt-10 sm:pb-14 sm:pt-12 md:pb-16 md:pt-14",
        }}
      >
        <p className="ui-section-label mb-3">Catalog</p>
        <h1 className="ui-page-title mb-4 max-w-2xl">All T-Shirts</h1>
        <p className="ui-body-lead max-w-xl">
          Browse the full marketplace — studio picks and designs from independent
          sellers.
        </p>
        {search ? (
          <p className="mt-5 text-sm text-brand-muted">
            Showing results for{" "}
            <span className="font-medium text-primary">&ldquo;{search}&rdquo;</span>
          </p>
        ) : null}

        <Suspense
          fallback={
            <div
              className="mb-10 h-36 animate-pulse rounded-2xl bg-brand-surface/60"
              aria-hidden
            />
          }
        >
          <BrowseToolbar />
        </Suspense>

        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : collection && collection.length > 0 ? (
          <>
            <StoreCollection collection={collection} />
            <BrowsePagination
              page={page}
              totalPages={Math.max(1, Math.ceil(total / perPage))}
              total={total}
              perPage={perPage}
              queryString={queryString}
            />
          </>
        ) : (
          <div className="max-w-md text-left">
            <p className="ui-section-label mb-2">No matches</p>
            <h2 className="ui-section-title mb-3">Nothing here yet</h2>
            <p className="ui-body-lead">
              {search
                ? "No products match your search and filters. Try adjusting filters or keywords."
                : "New listings appear here as soon as they go live."}
            </p>
          </div>
        )}
      </SectionContainer>
    </>
  )
}

export default Browse
