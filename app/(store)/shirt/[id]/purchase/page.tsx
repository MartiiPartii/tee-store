import SectionContainer from "@/app/components/SectionContainer"
import PurchaseForm from "@/app/components/PurchaseForm"
import OrderSummary from "@/app/components/OrderSummary"
import { getProductOverview, getUserShippingInfo } from "@/actions/purchase"

const Purchase = async ({ params }: { params: Promise<{ id: string }> }) => {
  const user = await getUserShippingInfo()
  const encodedId = (await params).id
  const b64id = decodeURIComponent(encodedId)
  const product = await getProductOverview(b64id)

  return (
    <SectionContainer props={{ className: "py-16" }}>
      <h1 className="mb-2 text-[2rem] font-bold text-brand-text">Checkout</h1>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 py-4 md:col-span-6 lg:col-span-8">
          {user && <PurchaseForm user={user} productId={product.id} />}
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <OrderSummary product={product} />
        </div>
      </div>
    </SectionContainer>
  )
}

export default Purchase
