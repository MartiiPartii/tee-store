import SectionContainer from "@/app/components/SectionContainer"
import UserInfo from "@/app/components/UserInfo"
import { ShoppingBag, Shirt, DollarSign } from "lucide-react"
import ProfileStatCard from "@/app/components/ProfileStatCard"
import LogOut from "@/app/components/LogOut"
import { getAccount } from "@/actions/authenticate"
import { Card } from "@/components/ui/card"

const Profile = async () => {
  const { user, shirts, profit, orders, error } = await getAccount()

  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <div className="mb-10 flex flex-col gap-2">
        <p className="ui-section-label">Account</p>
        <h1 className="ui-page-title">My Profile</h1>
        <p className="ui-body-lead max-w-xl">
          Here you can check out your account&apos;s info and statistics.
        </p>
        {error && (
          <div className="flex flex-col items-start gap-4 pt-2">
            <p className="text-sm italic text-destructive">{error}</p>
            <LogOut />
          </div>
        )}
      </div>

      {!error && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <Card className="flex h-full flex-col p-6 sm:p-8">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight text-primary">
                {user?.firstName || ""} {user?.lastName || ""}
              </h2>

              <div className="mb-6 flex flex-col gap-4">
                <UserInfo label="Email" text={user?.email || ""} />
                <UserInfo label="Phone Number" text={user?.phoneNumber || ""} />
                <UserInfo label="Address" text={user?.address || ""} />
              </div>

              <LogOut />
            </Card>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="grid grid-cols-12 gap-6">
              <ProfileStatCard
                Icon={Shirt}
                stat={String(shirts)}
                label="Shirts Selling"
                size={{ xs: 12, md: 6 }}
                link="/profile/my-shirts"
              />
              <ProfileStatCard
                Icon={DollarSign}
                stat={String(profit)}
                label="Total Earned"
                size={{ xs: 12, md: 6 }}
              />
              <ProfileStatCard
                Icon={ShoppingBag}
                stat={String(orders)}
                label="Orders"
                size={12}
                link="/profile/orders"
              />
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  )
}

export default Profile
