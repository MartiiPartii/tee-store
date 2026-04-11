import SectionContainer from "@/app/components/SectionContainer"
import { CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { verifyAccount } from "@/actions/authenticate"
import { logServerError } from "@/lib/logger"
import { Button } from "@/components/ui/button"

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
      <div className="mx-auto flex max-w-[36rem] flex-col items-center text-center">
        {success ? (
          <CheckCircle2
            className="mb-4 size-[4.8rem] text-green-600"
            aria-hidden
          />
        ) : (
          <XCircle
            className="mb-4 size-[4.8rem] text-destructive"
            aria-hidden
          />
        )}

        <h1 className="text-[2rem] font-bold text-brand-text">{title}</h1>
        <p className="mb-6 text-base text-brand-muted">{text}</p>

        <Link href={link}>
          <Button variant="default">{button}</Button>
        </Link>
      </div>
    </SectionContainer>
  )
}

export default Verify
