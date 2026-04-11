import SectionContainer from "@/app/components/SectionContainer"
import { Plus } from "lucide-react"
import OrdersStatCard from "@/app/components/OrdersStatCard"
import MyShirtCard from "@/app/components/MyShirtCard"
import Link from "next/link"
import { getMyShirts } from "@/actions/store"
import { Button } from "@/components/ui/button"

const MyShirts = async () => {
  const { shirts, totalSales, totalRevenue, error } = await getMyShirts()

  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div>
          <p className="ui-section-label mb-3">Listings</p>
          <h1 className="ui-page-title mb-4">My T-Shirts</h1>
          <p className="ui-body-lead max-w-xl">
            Manage your t-shirt listings and track performance.
          </p>
        </div>

        <Link href="/profile/sell-tshirt" className="shrink-0">
          <Button variant="default">
            <Plus className="size-4" />
            Sell New T-Shirt
          </Button>
        </Link>
      </div>

      {error ? (
        <p className="text-sm italic text-destructive">{error}</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-12 gap-4">
            <OrdersStatCard stat={String(shirts?.length || 0)} label="Total Listings" />
            <OrdersStatCard stat={String(totalSales || 0)} label="Total Sales" />
            <OrdersStatCard
              stat={`$${String(totalRevenue || 0)}`}
              label="Total Revenue"
            />
          </div>

          {shirts && shirts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {shirts.map((shirt, i) => (
                <MyShirtCard shirt={shirt} key={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4">
              <p className="ui-body-lead">You have no products yet...</p>
              <Link href="/profile/sell-tshirt">
                <Button variant="default" size="sm">
                  <Plus className="size-4" />
                  Sell New T-Shirt
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </SectionContainer>
  )
}

export default MyShirts
