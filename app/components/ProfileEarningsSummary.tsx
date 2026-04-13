import { DollarSign } from "lucide-react"

const ProfileEarningsSummary = ({ amount }: { amount: number }) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)

  return (
    <div
      className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-brand-bg/60 px-3 py-2 sm:mb-6 sm:px-3.5 sm:py-2.5"
      role="status"
      title="Lifetime total from your sold listings"
      aria-label={`Total earned: ${formatted}, summary only`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <DollarSign
          className="size-3.5 shrink-0 text-brand-muted sm:size-4"
          strokeWidth={2}
          aria-hidden
        />
        <span className="text-xs font-medium uppercase tracking-wide text-brand-muted">
          Total earned
        </span>
      </div>
      <p className="shrink-0 text-base font-semibold tabular-nums tracking-tight text-primary sm:text-lg">
        {formatted}
      </p>
    </div>
  )
}

export default ProfileEarningsSummary
