import { ShirtOverview } from "@/types/shirt"
import Image from "next/image"
import blank from "@/public/placeholder.webp"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const MyShirtCard = ({ shirt }: { shirt: ShirtOverview }) => {
  const encodedId = btoa(String(shirt.id))

  return (
    <Card className="p-6 sm:p-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-2 md:col-span-2">
          <Image
            src={shirt.imageLink ? shirt.imageLink : blank}
            alt="Product image"
            width={500}
            height={500}
            className="aspect-square w-full rounded-2xl object-cover"
          />
        </div>
        <div className="col-span-12 sm:col-span-10 md:col-span-10">
          <Link href={`/shirt/${encodedId}`}>
            <h2 className="ui-card-title mb-2 transition-colors hover:text-primary/80">
              {shirt.name}
            </h2>
          </Link>
          <p className="mb-3 text-xl font-semibold text-primary">${shirt.price}</p>
          <p className="ui-body-lead mb-6 max-w-2xl">
            {shirt.description.length > 200
              ? `${shirt.description.substring(0, 200)}...`
              : shirt.description}
          </p>

          <div className="flex w-full flex-row justify-between gap-6 sm:w-2/3 md:w-1/2">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Sales
              </p>
              <p className="text-base font-semibold text-primary">
                {shirt._count.orders}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                Revenue
              </p>
              <p className="text-base font-semibold text-primary">${shirt.revenue}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MyShirtCard
