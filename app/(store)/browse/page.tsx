import SectionContainer from "@/app/components/SectionContainer"
import StoreCollection from "@/app/components/StoreCollection"
import { getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"
import { Shirt } from "@/app/generated/prisma"

const Browse = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) => {
  const search = (await searchParams).search || ""
  const decodedSearch = decodeURIComponent(search)
  let collection: Shirt[] | null = null
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
      <div className="border-b border-border bg-brand-surface">
        <SectionContainer
          props={{
            className:
              "flex flex-col items-center justify-center py-16 text-center sm:py-20",
          }}
        >
          <p className="ui-section-label mb-3">Catalog</p>
          <h1 className="ui-page-title mb-4">All T-Shirts</h1>
          <p className="ui-body-lead max-w-xl">
            Browse our complete collection of premium t-shirts and unique designs
            from our community.
          </p>
        </SectionContainer>
      </div>
      <SectionContainer props={{ className: "ui-page-section" }}>
        {error ? (
          <p className="text-center text-sm italic text-destructive">{error}</p>
        ) : collection && collection.length > 0 ? (
          <StoreCollection collection={collection} />
        ) : (
          <div className="flex flex-col items-center text-center">
            <h2 className="ui-card-title mb-2">Nothing here yet</h2>
            <p className="ui-body-lead max-w-md">
              {decodedSearch
                ? "No products match your search query."
                : "Expect new products very soon."}
            </p>
          </div>
        )}
      </SectionContainer>
    </>
  )
}

export default Browse
