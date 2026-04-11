import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const ProfileStatCard = ({
  Icon,
  stat,
  label,
  size,
  link,
}: {
  Icon: LucideIcon
  stat: string
  label: string
  size: any
  link?: string
}) => {
  let colClass = "col-span-12"
  if (typeof size === "object" && size?.xs === 12 && size?.md === 6) {
    colClass = "col-span-12 md:col-span-6"
  }

  const inner = (
    <Card className="flex h-full flex-col items-center p-6 text-center">
      <div className="mb-2 text-primary">
        <Icon size={32} />
      </div>
      <p className="text-[1.5rem] font-bold text-brand-muted">{stat}</p>
      <p className="text-base text-brand-muted">{label}</p>
    </Card>
  )

  return (
    <div className={cn(colClass)}>
      {link ? (
        <Link href={link}>{inner}</Link>
      ) : (
        inner
      )}
    </div>
  )
}

export default ProfileStatCard
