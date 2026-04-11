import SectionContainer from "./SectionContainer"
import StoreCollection from "./StoreCollection"
import { Shirt } from "../generated/prisma"
import { getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"

const CommunityCollection = async () => {
  let data: Shirt[] = []
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
        className: "p-[25.6px] text-center sm:p-[51.2px]",
      }}
    >
      <h2 className="mb-6 text-[2rem] font-bold text-brand-text">
        Community collection
      </h2>

      {error ? (
        <p className="text-base italic text-destructive">{error}</p>
      ) : data && data.length > 0 ? (
        <StoreCollection collection={data} />
      ) : (
        <p className="text-base text-brand-muted">
          Nothing here. Expect new products soon.
        </p>
      )}
    </SectionContainer>
  )
}

export default CommunityCollection
