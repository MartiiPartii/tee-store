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
      <header className="border-b border-border pb-10 md:pb-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <p className="ui-section-label mb-3">Listings</p>
            <h1 className="ui-page-title mb-4">My T-shirts</h1>
            <p className="ui-body-lead max-w-xl">
              Manage your listings and see how they perform.
            </p>
          </div>

          <Link href="/profile/sell-tshirt" className="shrink-0">
            <Button variant="default">
              <Plus className="size-4" />
              New listing
            </Button>
          </Link>
        </div>
      </header>

      {error ? (
        <p
          className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : (
        <>
          <div className="my-10 grid grid-cols-1 divide-y divide-border/60 border-y border-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <OrdersStatCard stat={String(shirts?.length || 0)} label="Total listings" />
            <OrdersStatCard stat={String(totalSales || 0)} label="Total sales" />
            <OrdersStatCard
              stat={`$${String(totalRevenue || 0)}`}
              label="Total revenue"
            />
          </div>

          {shirts && shirts.length > 0 ? (
            <div className="border-t border-border/60 pt-2">
              {shirts.map((shirt) => (
                <MyShirtCard shirt={shirt} key={shirt.id} />
              ))}
            </div>
          ) : (
            <div className="mt-10 max-w-md border-t border-border/60 pt-10">
              <p className="ui-body-lead mb-6">You don&apos;t have any listings yet.</p>
              <Link href="/profile/sell-tshirt">
                <Button variant="default" size="sm">
                  <Plus className="size-4" />
                  Create a listing
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
