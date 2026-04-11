import type { Metadata } from "next"
import "./globals.css"
import ThemeWrapper from "./components/ThemeWrapper"
import Header from "./components/Header"
import BreadcrumbBar from "./components/BreadcrumbBar"
import Footer from "./components/Footer"
import { Suspense } from "react"
import Loading from "./loading"
import { montserrat } from "./fonts"

export const metadata: Metadata = {
  title: "TeeStore | Buy & Sell Unique T-Shirts Online",
  description:
    "Discover and shop unique T-shirts from independent creators, or sell your own designs on TeeMarket. A community-driven marketplace for all T-shirt lovers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <ThemeWrapper>
          <Header />
          <BreadcrumbBar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  )
}
