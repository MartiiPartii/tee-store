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
      <header className="border-b border-border pb-8 sm:pb-10">
        <p className="ui-section-label mb-2">Checkout</p>
        <h1 className="ui-page-title mb-3 sm:mb-4">Complete your order</h1>
        <p className="ui-body-lead max-w-xl text-pretty">
          Confirm size and shipping — your summary stays on the right on larger
          screens.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-x-8 gap-y-12 pt-8 sm:gap-x-10 sm:pt-10 lg:gap-x-12 lg:gap-y-0 lg:pt-12">
        <div className="col-span-12 lg:col-span-8 lg:max-w-3xl lg:pr-4">
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
