import { ProductOverview } from "@/types/shipping"
import Image from "next/image"
import PurchaseButton from "./PurchaseButton"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const OrderSummary = ({ product }: { product: ProductOverview }) => {
  return (
    <div className="sticky top-20 py-4">
      <Card className="p-6">
        <h2 className="mb-6 text-[1.5rem] font-bold text-brand-text">
          Order Summary
        </h2>

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
                borderRadius: 10,
              }}
            />
          </div>
          <div className="col-span-6 min-w-0">
            <Link href={`/shirt/${btoa(String(product.id))}`}>
              <p className="text-base text-brand-text transition-colors hover:text-primary/80">
                {product.name}
              </p>
            </Link>
            <p className="text-base text-brand-muted">
              By{" "}
              {product.soldByPlatform
                ? "TeeStore"
                : `${product.seller?.firstName} ${product.seller?.lastName}`}
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-end text-base text-brand-muted">
              ${product.price}
            </p>
          </div>
        </div>

        <Separator />

        <div className="mb-6 mt-4 flex flex-row justify-between gap-2">
          <p className="text-xl font-medium text-brand-muted">Total</p>
          <p className="text-xl font-medium text-brand-muted">${product.price}</p>
        </div>

        <PurchaseButton />
      </Card>
    </div>
  )
}

export default OrderSummary
