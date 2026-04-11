import SectionContainer from "@/app/components/SectionContainer"
import ShirtForm from "@/app/components/ShirtForm"

const Sell = () => {
  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <div className="mx-auto max-w-[42rem]">
        <p className="ui-section-label mb-3">Selling</p>
        <h1 className="ui-page-title mb-4">Sell your T-Shirt</h1>
        <p className="ui-body-lead mb-10">
          Create a new listing and start selling your t-shirt.
        </p>

        <ShirtForm />
      </div>
    </SectionContainer>
  )
}

export default Sell
