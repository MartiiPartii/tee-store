import SectionContainer from "@/app/components/SectionContainer"
import UserInfo from "@/app/components/UserInfo"
import { ShoppingBag, Shirt, DollarSign } from "lucide-react"
import ProfileStatCard from "@/app/components/ProfileStatCard"
import LogOut from "@/app/components/LogOut"
import { getAccount } from "@/actions/authenticate"

const Profile = async () => {
  const { user, shirts, profit, orders, error } = await getAccount()

  return (
    <SectionContainer props={{ className: "py-24" }}>
      <div className="mb-8 flex flex-col">
        <h1 className="text-[2rem] font-bold text-brand-text">My Profile</h1>
        <p className="text-base text-brand-muted">
          Here you can check out your account&apos;s info and statistics.
        </p>
        {error && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-base italic text-destructive">{error}</p>
            <LogOut />
          </div>
        )}
      </div>

      {!error && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 text-[2rem] font-bold text-brand-muted">
                {user?.firstName || ""} {user?.lastName || ""}
              </h2>

              <div className="mb-4 flex flex-col gap-2">
                <UserInfo label="Email" text={user?.email || ""} />
                <UserInfo label="Phone Number" text={user?.phoneNumber || ""} />
                <UserInfo label="Address" text={user?.address || ""} />
              </div>

              <LogOut />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="grid grid-cols-12 gap-6">
              <ProfileStatCard
                Icon={Shirt}
                stat={String(shirts)}
                label="Shirts Selling"
                size={{ xs: 12, md: 6 }}
                link="/my-shirts"
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
                link="/orders"
              />
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  )
}

export default Profile
