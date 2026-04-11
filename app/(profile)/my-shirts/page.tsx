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
    <SectionContainer props={{ className: "py-16" }}>
      <div className="mb-6 flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <h1 className="mb-2 text-[2rem] font-bold text-brand-text">My T-Shirts</h1>
          <p className="mb-6 text-base text-brand-muted">
            Manage your t-shirt listings and track performance
          </p>
        </div>

        <Link href="/sell-tshirt">
          <Button variant="accent">
            <Plus className="size-4" />
            Sell New T-Shirt
          </Button>
        </Link>
      </div>

      {error ? (
        <p className="text-base italic text-destructive">{error}</p>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-12 gap-4">
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
            <div className="flex flex-col gap-2">
              <p className="text-base text-brand-muted">You have no products yet...</p>
              <Link href="/sell-tshirt">
                <Button variant="accent" size="sm">
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
