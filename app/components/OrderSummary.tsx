import { ProductOverview } from "@/types/shipping"
import Image from "next/image"
import PurchaseButton from "./PurchaseButton"
import Link from "next/link"

const OrderSummary = ({ product }: { product: ProductOverview }) => {
  return (
    <aside className="sticky top-24 space-y-8 border-t border-border pt-10 sm:pt-12 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1 xl:pl-12">
      <div className="space-y-2">
        <p className="ui-section-label">Summary</p>
        <h2 className="ui-card-title">Order summary</h2>
      </div>

      <div className="flex gap-4 border-b border-border/60 pb-8 sm:gap-5">
        <Link
          href={`/shirt/${btoa(String(product.id))}`}
          className="relative shrink-0 overflow-hidden rounded-xl"
        >
          <Image
            src={product.imageLink}
            alt=""
            width={100}
            height={100}
            className="size-20 object-cover sm:size-24"
          />
        </Link>
        <div className="min-w-0 flex-1">
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
          <p className="mt-2 text-sm font-semibold tabular-nums text-primary">
            ${product.price}
          </p>
        </div>
      </div>

      <div className="flex flex-row items-baseline justify-between gap-3 border-b border-border/60 pb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-muted">
          Total
        </p>
        <p className="text-xl font-semibold tabular-nums text-primary">
          ${product.price}
        </p>
      </div>

      <PurchaseButton />
    </aside>
  )
}

export default OrderSummary
