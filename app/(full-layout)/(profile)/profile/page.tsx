import SectionContainer from "@/app/components/SectionContainer"
import UserInfo from "@/app/components/UserInfo"
import { ShoppingBag, Shirt, DollarSign } from "lucide-react"
import ProfileStatCard from "@/app/components/ProfileStatCard"
import LogOut from "@/app/components/LogOut"
import { getAccount } from "@/actions/authenticate"

const Profile = async () => {
  const { user, shirts, profit, orders, error } = await getAccount()

  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <header className="border-b border-border pb-10 md:pb-12">
        <p className="ui-section-label mb-3">Account</p>
        <h1 className="ui-page-title mb-4">My profile</h1>
        <p className="ui-body-lead max-w-xl">
          Your details and a quick snapshot of selling and orders.
        </p>
        {error ? (
          <div
            className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            <p className="mb-4">{error}</p>
            <LogOut />
          </div>
        ) : null}
      </header>

      {!error && (
        <div className="grid gap-12 pt-10 md:grid-cols-2 md:gap-16 md:pt-12 lg:gap-20">
          <section className="min-w-0">
            <h2 className="ui-section-title mb-8">
              {user?.firstName || ""} {user?.lastName || ""}
            </h2>
            <div className="flex flex-col gap-6 border-t border-border/60 pt-8">
              <UserInfo label="Email" text={user?.email || ""} />
              <UserInfo label="Phone number" text={user?.phoneNumber || ""} />
              <UserInfo label="Address" text={user?.address || ""} />
            </div>
            <div className="mt-10">
              <LogOut />
            </div>
          </section>

          <section className="min-w-0">
            <p className="ui-section-label mb-2">Overview</p>
            <h2 className="ui-card-title mb-6">Activity</h2>
            <div className="divide-y divide-border/60 border-t border-border/60">
              <ProfileStatCard
                Icon={Shirt}
                stat={String(shirts)}
                label="Shirts listed"
                link="/profile/my-shirts"
              />
              <ProfileStatCard
                Icon={DollarSign}
                stat={String(profit)}
                label="Total earned"
              />
              <ProfileStatCard
                Icon={ShoppingBag}
                stat={String(orders)}
                label="Orders"
                link="/profile/orders"
              />
            </div>
          </section>
        </div>
      )}
    </SectionContainer>
  )
}

export default Profile
