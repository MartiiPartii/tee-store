import Footer from "@/app/components/Footer"
import Loading from "@/app/loading"
import { Suspense } from "react"

export default function CleanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex min-h-0 flex-1 flex-col">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </>
  )
}
