import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const ProfileStatCard = ({
  Icon,
  stat,
  label,
  link,
}: {
  Icon: LucideIcon
  stat: string
  label: string
  link?: string
}) => {
  const inner = (
    <div
      className={cn(
        "flex items-center gap-4 py-5",
        link &&
          "group rounded-xl transition-colors hover:bg-primary/[0.04] sm:-mx-2 sm:px-2"
      )}
    >
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-brand-bg text-brand-muted transition-colors",
          link && "group-hover:border-primary group-hover:text-primary"
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-primary">
          {stat}
        </p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          {label}
        </p>
      </div>
      {link ? (
        <ChevronRight
          className="size-4 shrink-0 text-brand-muted transition-colors group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      ) : null}
    </div>
  )

  if (link) {
    return (
      <Link href={link} className="block text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
        {inner}
      </Link>
    )
  }

  return <div>{inner}</div>
}

export default ProfileStatCard
