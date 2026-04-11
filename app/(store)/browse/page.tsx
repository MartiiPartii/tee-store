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
      <div className="bg-brand-surface">
        <SectionContainer
          props={{
            className:
              "flex flex-col items-center justify-center py-24 text-center",
          }}
        >
          <h1 className="mb-2 text-[3.2rem] font-bold text-brand-text">
            All T-Shirts
          </h1>
          <p className="mb-2 text-xl text-brand-muted">
            Browse our complete collection of premium t-shirts and unique
            designs from our community.
          </p>
        </SectionContainer>
      </div>
      <SectionContainer props={{ className: "py-16" }}>
        {error ? (
          <p className="text-center text-base italic text-destructive">{error}</p>
        ) : collection && collection.length > 0 ? (
          <StoreCollection collection={collection} />
        ) : (
          <div className="flex flex-col">
            <h2 className="text-[1.2rem] font-bold text-brand-text">
              Nothing here...
            </h2>
            <p className="text-base text-brand-muted">
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
