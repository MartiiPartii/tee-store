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
      <div className="max-w-lg border-b border-border pb-12 text-left">
        <p className="ui-section-label mb-3">Error</p>
        <p className="mb-2 text-5xl font-semibold tabular-nums tracking-tight text-primary sm:text-6xl md:text-7xl">
          404
        </p>
        <h1 className="ui-page-title mb-4">Page not found</h1>
        <p className="ui-body-lead mb-8">
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <Link href="/">
          <Button variant="default">Back home</Button>
        </Link>
      </div>
    </SectionContainer>
  )
}
