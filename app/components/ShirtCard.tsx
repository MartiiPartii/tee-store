import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import placeholder from "@/public/placeholder.webp"
import type { CatalogShirt } from "@/types/shirt"

const ShirtCard = ({
  shirt,
  button = true,
}: {
  shirt: CatalogShirt
  button?: boolean
}) => {
  const encodedId = btoa(String(shirt.id))
  const seller = !shirt.soldByPlatform ? shirt.seller : null

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

      <div className="mt-4 flex flex-1 flex-col items-stretch gap-2 sm:mt-5">
        {!shirt.soldByPlatform && seller && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
            By {seller.firstName} {seller.lastName}
          </p>
        )}

        <div className="flex items-start justify-between gap-3">
          <Link href={`/shirt/${encodedId}`} className="min-w-0 flex-1">
            <h2 className="ui-card-title line-clamp-2 transition-colors hover:text-primary/80">
              {shirt.name}
            </h2>
          </Link>
          <p className="shrink-0 text-base font-semibold tabular-nums tracking-tight text-primary">
            ${shirt.price}
          </p>
        </div>

        <p className="ui-body-lead line-clamp-3 flex-1">{shirt.description}</p>
      </div>
    </article>
  )
}

export default ShirtCard
