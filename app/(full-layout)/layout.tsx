import BreadcrumbBar from "@/app/components/BreadcrumbBar"
import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"
import Loading from "@/app/loading"
import { Suspense } from "react"

export default function FullLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <BreadcrumbBar />
      <div className="flex min-h-0 flex-1 flex-col">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </>
  )
}
