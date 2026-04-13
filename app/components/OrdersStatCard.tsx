const OrdersStatCard = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="flex flex-col gap-1 py-5 sm:px-4 sm:py-6 sm:text-center">
      <p className="text-2xl font-semibold tabular-nums tracking-tight text-primary">
        {stat}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label}
      </p>
    </div>
  )
}

export default OrdersStatCard
