import type { Metadata } from "next"
import "./globals.css"
import ThemeWrapper from "./components/ThemeWrapper"
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
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  )
}
