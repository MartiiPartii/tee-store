import SectionContainer from "@/app/components/SectionContainer"
import OrderListCard from "@/app/components/OrderListCard"
import { getMyOrders } from "@/actions/orders"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Orders = async () => {
  const { error, orders } = await getMyOrders()

  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <header className="border-b border-border pb-10 md:pb-12">
        <p className="ui-section-label mb-3">Orders</p>
        <h1 className="ui-page-title mb-4">My orders</h1>
        <p className="ui-body-lead max-w-xl">
          Order history and links to each receipt.
        </p>
      </header>

      <div className="pt-10">
        {error ? (
          <p
            className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : orders && orders.length > 0 ? (
          <div className="divide-y divide-border/60 border-y border-border/60">
            {orders.map((order) => (
              <OrderListCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="max-w-md border-t border-border/60 pt-10">
            <p className="ui-section-label mb-2">Empty</p>
            <h2 className="ui-card-title mb-3">Nothing here yet</h2>
            <p className="ui-body-lead mb-6">
              You haven&apos;t purchased anything yet.
            </p>
            <Link href="/browse">
              <Button variant="default">Browse tees</Button>
            </Link>
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default Orders
