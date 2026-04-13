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
      <header className="border-b border-border pb-10 md:pb-12">
        <p className="ui-section-label mb-3">Checkout</p>
        <h1 className="ui-page-title mb-4">Complete your order</h1>
        <p className="ui-body-lead max-w-xl">
          Confirm size and shipping — your summary stays on the right on larger screens.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-10 pt-10 lg:gap-12 lg:pt-12">
        <div className="col-span-12 lg:col-span-8">
          {user && <PurchaseForm user={user} productId={product.id} />}
        </div>
        <div className="col-span-12 lg:col-span-4">
          <OrderSummary product={product} />
        </div>
      </div>
    </SectionContainer>
  )
}

export default Purchase
