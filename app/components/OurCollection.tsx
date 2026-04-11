import SectionContainer from "./SectionContainer"
import StoreCollection from "./StoreCollection"
import { getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"
import { Shirt } from "../generated/prisma"

const OurCollection = async () => {
  let data: Shirt[] = []
  let error = null

  try {
    const collection = await getShirts({ take: 3, soldByPlatform: true })
    data = collection
  } catch (err) {
    logServerError("home:our_collection_failed", err)
    error = "We couldnt fetch our premium collection."
  }

  return (
    <SectionContainer
      props={{
        className: "ui-page-section text-center",
      }}
    >
      <p className="ui-section-label mb-3">Collections</p>
      <h2 className="ui-section-title mb-4">Our premium collection</h2>
      <p className="ui-body-lead mx-auto mb-10 max-w-lg">
        Hand-picked designs from the TeeStore studio — limited runs and timeless
        staples.
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

export default OurCollection
