import { Metadata } from "next"
import SectionContainer from "./components/SectionContainer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <SectionContainer props={{ className: "ui-page-section" }}>
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center text-center">
        <p className="ui-section-label mb-3">Error</p>
        <h1 className="mb-2 text-6xl font-semibold tracking-tight text-primary md:text-7xl">
          404
        </h1>
        <h2 className="ui-page-title mb-4">Page not found</h2>
        <p className="ui-body-lead mb-8">
          The page you are looking for was not found.
        </p>
        <Link href="/">
          <Button variant="default">Home</Button>
        </Link>
      </div>
    </SectionContainer>
  )
}
