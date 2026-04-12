import SectionContainer from "@/app/components/SectionContainer"
import { Check } from "lucide-react"
import Image from "next/image"
import placeholder from "@/public/placeholder.webp"
import Link from "next/link"
import { getShirt } from "@/actions/store"
import { Button } from "@/components/ui/button"

const Shirt = async ({ params }: { params: Promise<{ id: string }> }) => {
  const encodedId = (await params).id
  const b64 = encodedId ? decodeURIComponent(encodedId) : ""

  const { shirt } = await getShirt(b64)

  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      {shirt && (
        <div className="grid grid-cols-12 gap-10 lg:gap-12">
          <div className="col-span-12 md:col-span-4 lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-brand-surface shadow-soft">
              <Image
                src={shirt.imageLink || placeholder}
                alt="Product Image"
                width={1000}
                height={1000}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className="col-span-12 flex flex-col md:col-span-8 lg:col-span-6">
            <div className="mb-4 flex flex-row flex-wrap gap-2">
              {!shirt.soldByPlatform && shirt.seller && (
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  By {shirt.seller.firstName} {shirt.seller.lastName}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-brand-bg px-3 py-1 text-xs font-medium text-primary">
                <Check className="size-3.5" aria-hidden />
                In Stock
              </span>
            </div>

            <p className="ui-section-label mb-2">Product</p>
            <h1 className="ui-page-title mb-4 text-balance">{shirt.name}</h1>

            <p className="mb-6 text-3xl font-semibold tracking-tight text-primary">
              ${shirt.price}
            </p>

            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col">
                <p className="ui-section-label mb-2">Description</p>
                <p className="ui-body-lead mb-8">
                  {shirt.description}
                </p>
              </div>

              <Link href={`/shirt/${b64}/purchase`}>
                <Button variant="default" size="lg" className="w-full">
                  Buy - ${shirt.price}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  )
}

export default Shirt
