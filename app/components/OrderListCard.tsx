import { OrderPreview } from "@/types/order"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const OrderListCard = ({ order }: { order: OrderPreview }) => {
  const encodedId = btoa(String(order.id))

  return (
    <Link
      href={`/profile/orders/${encodedId}`}
      className="group flex items-center gap-4 py-6 transition-colors hover:bg-primary/[0.03] sm:gap-6 sm:rounded-xl sm:px-3"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
        <p className="ui-card-title shrink-0">Order {order.id}</p>
        <p className="text-sm text-brand-muted">
          Placed on {order.date.toDateString()}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-end">
        <div>
          <p className="text-lg font-semibold tabular-nums text-primary">
            ${order.item.price}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
            1 item
          </p>
        </div>
        <ChevronRight
          className="size-4 text-brand-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </div>
    </Link>
  )
}

export default OrderListCard
