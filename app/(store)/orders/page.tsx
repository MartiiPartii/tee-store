import SectionContainer from "@/app/components/SectionContainer"
import OrderListCard from "@/app/components/OrderListCard"
import { getMyOrders } from "@/actions/orders"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const Orders = async () => {
  const { error, orders } = await getMyOrders()

  return (
    <SectionContainer props={{ className: "py-24" }}>
      <h1 className="mb-2 text-[2rem] font-bold text-brand-text">My Orders</h1>
      <p className="mb-4 text-base text-brand-muted">Track your order history</p>

      {error ? (
        <p className="text-base italic text-destructive">{error}</p>
      ) : orders && orders.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order, i) => (
            <OrderListCard key={i} order={order} />
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col">
          <h2 className="text-[1.2rem] font-bold text-brand-text">Nothing here...</h2>
          <p className="mb-4 text-base text-brand-muted">
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
