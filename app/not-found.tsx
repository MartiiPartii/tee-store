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
    <SectionContainer props={{ className: "py-16" }}>
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-[3.2rem] font-bold text-brand-text">404</h1>
        <h2 className="mb-2 text-[1.5rem] font-bold text-brand-text">Not Found</h2>
        <p className="mb-4 text-base text-brand-muted">
          The page you are looking for was not found.
        </p>
        <Link href="/">
          <Button variant="default">Home</Button>
        </Link>
      </div>
    </SectionContainer>
  )
}
