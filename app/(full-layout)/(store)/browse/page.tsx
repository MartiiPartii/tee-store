import SectionContainer from "@/app/components/SectionContainer"
import StoreCollection from "@/app/components/StoreCollection"
import { getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"
import type { CatalogShirt } from "@/types/shirt"

const Browse = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) => {
  const search = (await searchParams).search || ""
  const decodedSearch = decodeURIComponent(search).trim()
  let collection: CatalogShirt[] | null = null
  let error: string | null = null

  try {
    collection = await getShirts({
      searchQuery: decodedSearch,
    })
  } catch (err) {
    logServerError("browse:get_shirts_failed", err, { search: decodedSearch })
    error = "We couldn't fetch products properly. Please try again."
  }

  return (
    <>
      <SectionContainer
        props={{
          className:
            "border-b border-border pb-12 pt-10 sm:pb-14 sm:pt-12 md:pb-16 md:pt-14",
        }}
      >
        <p className="ui-section-label mb-3">Catalog</p>
        <h1 className="ui-page-title mb-4 max-w-2xl">All T-Shirts</h1>
        <p className="ui-body-lead max-w-xl">
          Browse the full marketplace — studio picks and designs from independent
          sellers.
        </p>
        {decodedSearch ? (
          <p className="mt-5 text-sm text-brand-muted">
            Showing results for{" "}
            <span className="font-medium text-primary">&ldquo;{decodedSearch}&rdquo;</span>
          </p>
        ) : null}
      </SectionContainer>

      <SectionContainer props={{ className: "ui-page-section" }}>
        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : collection && collection.length > 0 ? (
          <StoreCollection collection={collection} />
        ) : (
          <div className="max-w-md text-left">
            <p className="ui-section-label mb-2">No matches</p>
            <h2 className="ui-section-title mb-3">Nothing here yet</h2>
            <p className="ui-body-lead">
              {decodedSearch
                ? "No products match your search. Try different keywords or clear the search in the header."
                : "New listings appear here as soon as they go live."}
            </p>
          </div>
        )}
      </SectionContainer>
    </>
  )
}

export default Browse
