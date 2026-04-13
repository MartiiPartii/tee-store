import SectionContainer from "@/app/components/SectionContainer"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const Verify = () => {
  return (
    <SectionContainer
      props={{
        className: "flex min-h-screen flex-col justify-center py-16",
      }}
    >
      <div className="mx-auto max-w-md border-b border-border pb-12 text-center">
        <Mail
          className="mx-auto mb-8 size-14 text-primary"
          strokeWidth={1.25}
          aria-hidden
        />

        <p className="ui-section-label mb-3">Email</p>
        <h1 className="ui-page-title mb-4">Verify your account</h1>
        <p className="ui-body-lead mb-10">
          We&apos;ve sent a verification link to your email. Once you&apos;re verified you
          can sign in and shop.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button variant="outlinePrimary">Home</Button>
          </Link>
          <Link href="/login">
            <Button variant="default">Log in</Button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  )
}

export default Verify
