import { Card } from "@/components/ui/card"

const OrdersStatCard = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="col-span-12 md:col-span-4">
      <Card className="p-6 text-center sm:p-8">
        <p className="text-2xl font-semibold tracking-tight text-primary">{stat}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-muted">
          {label}
        </p>
      </Card>
    </div>
  )
}

export default OrdersStatCard
