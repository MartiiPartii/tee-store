import { OrderPreview } from "@/types/order"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const OrderListCard = ({ order }: { order: OrderPreview }) => {
  const encodedId = btoa(String(order.id))

  return (
    <Link href={`/orders/${encodedId}`}>
      <Card className="cursor-pointer p-6 transition-colors hover:border-primary/25 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-row items-center gap-4">
            <CheckCircle2
              className="size-6 shrink-0 text-primary"
              strokeWidth={1.5}
              aria-hidden
            />

            <div className="flex flex-col gap-1">
              <p className="ui-card-title">Order {order.id}</p>
              <p className="text-sm text-brand-muted">
                Placed on {order.date.toDateString()}
              </p>
            </div>
          </div>

          <div className="text-start sm:text-end">
            <p className="text-lg font-semibold text-primary">${order.item.price}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              1 item
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default OrderListCard
