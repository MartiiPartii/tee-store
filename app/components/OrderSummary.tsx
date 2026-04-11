import { ProductOverview } from "@/types/shipping"
import Image from "next/image"
import PurchaseButton from "./PurchaseButton"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const OrderSummary = ({ product }: { product: ProductOverview }) => {
  return (
    <div className="sticky top-20 py-4">
      <Card className="p-6 sm:p-8">
        <p className="ui-section-label mb-2">Summary</p>
        <h2 className="ui-card-title mb-6">Order summary</h2>

        <div className="mb-2 grid grid-cols-12 items-center gap-4">
          <div className="col-span-3">
            <Image
              src={product.imageLink}
              alt="Product Image"
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
            />
          </div>
          <div className="col-span-6 min-w-0">
            <Link href={`/shirt/${btoa(String(product.id))}`}>
              <p className="font-medium text-primary transition-colors hover:text-primary/80">
                {product.name}
              </p>
            </Link>
            <p className="mt-1 text-sm text-brand-muted">
              By{" "}
              {product.soldByPlatform
                ? "TeeStore"
                : `${product.seller?.firstName} ${product.seller?.lastName}`}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-end text-sm font-semibold text-primary">
              ${product.price}
            </p>
          </div>
        </div>

        <Separator />

        <div className="mb-6 mt-4 flex flex-row justify-between gap-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
            Total
          </p>
          <p className="text-xl font-semibold text-primary">${product.price}</p>
        </div>

        <PurchaseButton />
      </Card>
    </div>
  )
}

export default OrderSummary
