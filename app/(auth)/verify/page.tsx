import SectionContainer from "@/app/components/SectionContainer"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Verify = () => {
  return (
    <SectionContainer
      props={{
        className: "flex min-h-screen flex-col justify-center",
      }}
    >
      <Card className="mx-auto max-w-md p-8 text-center sm:p-10">
        <Mail
          className="mx-auto mb-6 size-16 text-primary"
          strokeWidth={1.25}
          aria-hidden
        />

        <p className="ui-section-label mb-3">Email</p>
        <h1 className="ui-page-title mb-4">Verify your account</h1>
        <p className="ui-body-lead mb-8">
          We&apos;ve sent a verification link to your email. Once you&apos;re verified
          you can start shopping.
        </p>

        <div className="flex flex-row justify-center gap-2">
          <Link href="/">
            <Button variant="outlinePrimary">Home</Button>
          </Link>
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        </div>
      </Card>
    </SectionContainer>
  )
}

export default Verify
