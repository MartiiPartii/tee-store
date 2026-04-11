import { ShirtOverview } from "@/types/shirt"
import Image from "next/image"
import blank from "@/public/placeholder.webp"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const MyShirtCard = ({ shirt }: { shirt: ShirtOverview }) => {
  const encodedId = btoa(String(shirt.id))

  return (
    <Card className="p-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-2 md:col-span-2">
          <Image
            src={shirt.imageLink ? shirt.imageLink : blank}
            alt="Product image"
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        </div>
        <div className="col-span-12 sm:col-span-10 md:col-span-10">
          <Link href={`/shirt/${encodedId}`}>
            <h2
              className="mb-2 text-[1.2rem] font-bold text-brand-muted transition-colors hover:text-primary/80"
            >
              {shirt.name}
            </h2>
          </Link>
          <p className="mb-2 text-[1.5rem] font-bold text-primary">${shirt.price}</p>
          <p className="mb-6 text-base text-brand-muted">
            {shirt.description.length > 200
              ? `${shirt.description.substring(0, 200)}...`
              : shirt.description}
          </p>

          <div className="flex w-full flex-row justify-between sm:w-1/2 md:w-1/4">
            <div className="flex flex-col">
              <p className="text-sm text-brand-muted">Sales</p>
              <p className="text-base font-semibold text-brand-muted">
                {shirt._count.orders}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-brand-muted">Revenue</p>
              <p className="text-base font-semibold text-brand-muted">
                ${shirt.revenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MyShirtCard
