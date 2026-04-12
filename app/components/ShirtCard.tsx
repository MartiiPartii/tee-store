import { Shirt } from "../generated/prisma"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import placeholder from "@/public/placeholder.webp"
import { getShirtSeller } from "@/actions/store"

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
    <article className="group col-span-12 flex flex-col text-left sm:col-span-6 md:col-span-4">
      <div className="relative overflow-hidden rounded-2xl group/photo">
        <Image
          width={256}
          height={256}
          alt={shirt.name}
          src={shirt.imageLink || placeholder}
          className="aspect-square w-full object-cover object-center transition-transform duration-500 ease-out group-hover/photo:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Link
          href={`/shirt/${encodedId}`}
          className="absolute inset-0 z-[1] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="sr-only">View {shirt.name}</span>
        </Link>
        {button && (
          <Link
            href={`/shirt/${encodedId}/purchase`}
            className="absolute right-2 top-2 z-[2] inline-flex size-10 items-center justify-center rounded-full border border-border bg-brand-bg text-brand-muted transition-[opacity,transform,border-color,color] duration-200 ease-out hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [@media(hover:hover)]:pointer-events-none [@media(hover:hover)]:translate-y-0.5 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/photo:pointer-events-auto [@media(hover:hover)]:group-hover/photo:translate-y-0 [@media(hover:hover)]:group-hover/photo:opacity-100 [@media(hover:hover)]:group-focus-within/photo:pointer-events-auto [@media(hover:hover)]:group-focus-within/photo:translate-y-0 [@media(hover:hover)]:group-focus-within/photo:opacity-100"
            aria-label={`Go to checkout for ${shirt.name}, ${shirt.price} dollars`}
          >
            <ShoppingCart className="size-[18px]" aria-hidden />
          </Link>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col items-start">
        {!shirt.soldByPlatform && seller && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-brand-muted">
            By {seller.firstName} {seller.lastName}
          </p>
        )}

        <Link href={`/shirt/${encodedId}`}>
          <h2 className="ui-card-title transition-colors hover:text-primary/80">
            {shirt.name}
          </h2>
        </Link>

        <p className="ui-body-lead mt-2 line-clamp-3 flex-1">
          {shirt.description}
        </p>

        <div className="mt-5 w-full border-t border-border/60 pt-5">
          <p className="text-base font-semibold tracking-tight text-primary">
            ${shirt.price}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ShirtCard
