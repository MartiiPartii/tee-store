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
      <Card className="mx-auto max-w-md p-6 text-center">
        <Mail className="mx-auto mb-4 size-24 text-brand-text" aria-hidden />

        <h1 className="text-[2rem] font-bold text-brand-text">Verify your account.</h1>
        <p className="mb-6 text-base text-brand-muted">
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
