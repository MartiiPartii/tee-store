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

  const { shirt, user } = await getShirt(b64)

  return (
    <SectionContainer props={{ className: "py-16" }}>
      {shirt && (
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-4 lg:col-span-6">
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
                borderRadius: "10px",
              }}
            />
          </div>

          <div className="col-span-12 flex flex-col md:col-span-8 lg:col-span-6">
            <div className="mb-2 flex flex-row gap-2">
              {!shirt.soldByPlatform && (
                <span className="inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                  By {user!.firstName || ""} {user!.lastName || ""}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-md border border-accent px-2 py-0.5 text-xs font-medium text-accent">
                <Check className="size-3.5" aria-hidden />
                In Stock
              </span>
            </div>

            <h1 className="mb-4 text-[3.2rem] font-bold text-brand-muted">
              {shirt.name}
            </h1>

            <p className="mb-6 text-[2rem] font-bold text-accent">${shirt.price}</p>

            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col">
                <p className="mb-2 text-base font-medium text-brand-muted">
                  Description
                </p>
                <p className="mb-8 text-base text-brand-muted">
                  {shirt.description}
                </p>
              </div>

              <Link href={`/shirt/${b64}/purchase`}>
                <Button variant="accent" size="lg" className="w-full">
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
