import SectionContainer from "./SectionContainer"
import StoreCollection from "./StoreCollection"
import type { CatalogShirt } from "@/types/shirt"
import { getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"

const CommunityCollection = async () => {
  let data: CatalogShirt[] = []
  let error = null

  try {
    const collection = await getShirts({ take: 3, soldByPlatform: false })
    data = collection
  } catch (err) {
    logServerError("home:community_collection_failed", err)
    error = "We couldnt fetch our community collection."
  }

  return (
    <SectionContainer
      props={{
        className: "ui-page-section border-t border-border text-center",
      }}
    >
      <p className="ui-section-label mb-3">Community</p>
      <h2 className="ui-section-title mb-4">From independent creators</h2>
      <p className="ui-body-lead mx-auto mb-10 max-w-lg">
        Discover tees listed by artists and sellers on the marketplace.
      </p>

      {error ? (
        <p className="text-sm italic text-destructive">{error}</p>
      ) : data && data.length > 0 ? (
        <StoreCollection collection={data} />
      ) : (
        <p className="ui-body-lead">
          Nothing here. Expect new products soon.
        </p>
      )}
    </SectionContainer>
  )
}

export default CommunityCollection
