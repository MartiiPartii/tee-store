import SectionContainer from "@/app/components/SectionContainer"
import ShirtForm from "@/app/components/ShirtForm"
import { Card } from "@/components/ui/card"

const Sell = () => {
  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <div className="mx-auto max-w-[42rem]">
        <p className="ui-section-label mb-3">Selling</p>
        <h1 className="ui-page-title mb-4">Sell your T-Shirt</h1>
        <p className="ui-body-lead mb-8">
          Create a new listing and start selling your t-shirt.
        </p>

        <Card className="p-6 sm:p-8">
          <h2 className="ui-card-title mb-6">T-Shirt details</h2>

          <ShirtForm />
        </Card>
      </div>
    </SectionContainer>
  )
}

export default Sell
