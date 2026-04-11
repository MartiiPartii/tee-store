import SectionContainer from "@/app/components/SectionContainer"
import OrderListCard from "@/app/components/OrderListCard"
import { getMyOrders } from "@/actions/orders"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Orders = async () => {
  const { error, orders } = await getMyOrders()

  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <p className="ui-section-label mb-3">Orders</p>
      <h1 className="ui-page-title mb-4">My Orders</h1>
      <p className="ui-body-lead mb-8 max-w-xl">
        Track your order history and receipts.
      </p>

      {error ? (
        <p className="text-sm italic text-destructive">{error}</p>
      ) : orders && orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order, i) => (
            <OrderListCard key={i} order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4">
          <h2 className="ui-card-title">Nothing here yet</h2>
          <p className="ui-body-lead mb-2 max-w-md">
            You haven&apos;t purchased any products yet.
          </p>
          <Link href="/browse">
            <Button variant="default">Browse</Button>
          </Link>
        </div>
      )}
    </SectionContainer>
  )
}

export default Orders
