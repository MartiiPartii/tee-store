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
    <SectionContainer props={{ className: "ui-page-section" }}>
      <p className="ui-section-label mb-3">Checkout</p>
      <h1 className="ui-page-title mb-10">Complete your order</h1>

      <div className="grid grid-cols-12 gap-8 lg:gap-10">
        <div className="col-span-12 py-2 md:col-span-6 lg:col-span-8">
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
