import SectionContainer from "@/app/components/SectionContainer"
import { CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { verifyAccount } from "@/actions/authenticate"
import { logServerError } from "@/lib/logger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const Verify = async ({
  params,
}: {
  params: Promise<{ uidb: string; token: string }>
}) => {
  const { uidb, token } = await params
  let title = "Account verified.",
    text = "Your account was successfully verified. Now you can login.",
    button = "Login",
    link = "/login",
    success = true

  try {
    await verifyAccount(uidb, token)
  } catch (err) {
    logServerError("verify_page:verify_account_failed", err, { uidb })
    title = err instanceof Error ? err.message : "Something went wrong"
    text = ""
    button = "Home"
    link = "/"
    success = false
  }

  return (
    <SectionContainer
      props={{
        className: "flex min-h-screen flex-col justify-center",
      }}
    >
      <Card className="mx-auto w-full max-w-md p-8 text-center sm:p-10">
        {success ? (
          <CheckCircle2
            className="mx-auto mb-6 size-16 text-green-600"
            strokeWidth={1.25}
            aria-hidden
          />
        ) : (
          <XCircle
            className="mx-auto mb-6 size-16 text-destructive"
            strokeWidth={1.25}
            aria-hidden
          />
        )}

        <p className="ui-section-label mb-3">{success ? "Verified" : "Status"}</p>
        <h1 className="ui-page-title mb-4">{title}</h1>
        {text ? <p className="ui-body-lead mb-8">{text}</p> : null}

        <Link href={link}>
          <Button variant="default">{button}</Button>
        </Link>
      </Card>
    </SectionContainer>
  )
}

export default Verify
