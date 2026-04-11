import SectionContainer from "@/app/components/SectionContainer"
import ShirtForm from "@/app/components/ShirtForm"
import { Card } from "@/components/ui/card"

const Sell = () => {
  return (
    <SectionContainer
      props={{
        className: "pb-16 pt-[120px]",
      }}
    >
      <div className="mx-auto max-w-[42rem]">
        <h1 className="text-[2rem] font-bold text-brand-text">
          Sell your T-Shirt
        </h1>
        <p className="mb-6 text-base text-brand-muted">
          Create a new listing and start selling your t-shirt
        </p>

        <Card className="p-6">
          <h2 className="mb-4 text-[1.5rem] font-bold text-brand-text">
            T-Shirt Details
          </h2>

          <ShirtForm />
        </Card>
      </div>
    </SectionContainer>
  )
}

export default Sell
