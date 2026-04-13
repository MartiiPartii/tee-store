import SectionContainer from "@/app/components/SectionContainer"
import ShirtForm from "@/app/components/ShirtForm"

const Sell = () => {
  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <header className="border-b border-border pb-10 md:pb-12">
        <p className="ui-section-label mb-3">Selling</p>
        <h1 className="ui-page-title mb-4">Sell your T-shirt</h1>
        <p className="ui-body-lead max-w-2xl">
          Add a square photo, set a price, and publish to the community marketplace.
        </p>
      </header>

      <div className="mx-auto max-w-[42rem] pt-10 md:pt-12">
        <ShirtForm />
      </div>
    </SectionContainer>
  )
}

export default Sell
