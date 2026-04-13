import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionContainer from "./SectionContainer"
import StoreCollection from "./StoreCollection"
import type { CatalogShirt } from "@/types/shirt"
import { getShirts } from "@/actions/store"
import { logServerError } from "@/lib/logger"
import { buildBrowsePath } from "@/lib/browse-params"

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
      <p className="ui-body-lead mx-auto mb-5 max-w-lg">
        Discover tees listed by artists and sellers on the marketplace.
      </p>

      <div className="mb-12 flex justify-center">
        <Link
          href={buildBrowsePath("", { source: "community" })}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
          aria-label="See all community listings in the catalog"
        >
          See all
          <ArrowRight
            className="size-3.5 shrink-0 opacity-70 transition-[transform,opacity] group-hover:translate-x-0.5 group-hover:opacity-100"
            aria-hidden
          />
        </Link>
      </div>

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
