import { Shirt } from "../generated/prisma"
import Image from "next/image"
import Link from "next/link"
import placeholder from "@/public/placeholder.webp"
import { getShirtSeller } from "@/actions/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ShirtCard = async ({
  shirt,
  button = true,
}: {
  shirt: Shirt
  button?: boolean
}) => {
  const encodedId = btoa(String(shirt.id))

  let seller: { firstName: string; lastName: string } | null = null
  if (!shirt.soldByPlatform) {
    const sellerId = shirt.sellerId!
    seller = await getShirtSeller(sellerId)
  }

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4">
      <Card className="relative flex h-full flex-col text-start">
        {!shirt.soldByPlatform && seller && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
            By {seller.firstName} {seller.lastName}
          </span>
        )}

        <Image
          width={256}
          height={256}
          alt={shirt.name}
          src={shirt.imageLink || placeholder}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-1 flex-col">
            <Link href={`/shirt/${encodedId}`}>
              <h2 className="mb-2 mt-4 text-[1.4rem] font-bold text-primary transition-colors hover:text-accent">
                {shirt.name}
              </h2>
            </Link>
            <p className="mb-3 text-sm text-brand-muted">
              {shirt.description.length > 100
                ? `${shirt.description.substring(0, 200)}...`
                : shirt.description}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="mb-4 text-[1rem] font-bold text-primary">
              ${shirt.price}
            </p>
            {button && (
              <Link href={`/shirt/${encodedId}/purchase`}>
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full justify-self-end"
                >
                  Purchase - ${shirt.price}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ShirtCard
