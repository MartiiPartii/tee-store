import { Card } from "@/components/ui/card"

const OrdersStatCard = ({ stat, label }: { stat: string; label: string }) => {
  return (
    <div className="col-span-12 md:col-span-4">
      <Card className="p-6 text-center">
        <p className="text-[1.5rem] font-bold text-brand-muted">{stat}</p>
        <p className="text-base text-brand-muted">{label}</p>
      </Card>
    </div>
  )
}

export default OrdersStatCard
