import { ShirtOverview } from "@/types/shirt"
import Image from "next/image"
import blank from "@/public/placeholder.webp"
import Link from "next/link"

const MyShirtCard = ({ shirt }: { shirt: ShirtOverview }) => {
  const encodedId = btoa(String(shirt.id))

  return (
    <article className="border-b border-border/60 py-10 last:border-b-0 last:pb-2">
      <div className="grid grid-cols-12 gap-6 sm:gap-8">
        <div className="col-span-12 sm:col-span-3 md:col-span-2">
          <Link href={`/shirt/${encodedId}`} className="block overflow-hidden rounded-2xl">
            <Image
              src={shirt.imageLink ? shirt.imageLink : blank}
              alt=""
              width={500}
              height={500}
              className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </Link>
        </div>
        <div className="col-span-12 sm:col-span-9 md:col-span-10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <Link href={`/shirt/${encodedId}`} className="min-w-0 flex-1">
              <h2 className="ui-card-title line-clamp-2 transition-colors hover:text-primary/80">
                {shirt.name}
              </h2>
            </Link>
            <p className="shrink-0 text-xl font-semibold tabular-nums tracking-tight text-primary">
              ${shirt.price}
            </p>
          </div>
          <p className="ui-body-lead mt-3 line-clamp-3 max-w-2xl sm:line-clamp-4">
            {shirt.description.length > 200
              ? `${shirt.description.substring(0, 200)}...`
              : shirt.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-8 sm:gap-12">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Sales
              </p>
              <p className="text-base font-semibold tabular-nums text-primary">
                {shirt._count.orders}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Revenue
              </p>
              <p className="text-base font-semibold tabular-nums text-primary">
                ${shirt.revenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MyShirtCard
