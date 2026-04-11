"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { navLinkClass } from "@/lib/site-ui"
import { cn } from "@/lib/utils"

export default function AuthBackButton() {
  const router = useRouter()

  return (
    <div className="mb-8 flex w-full justify-start">
      <button
        type="button"
        onClick={() => router.back()}
        className={cn(
          "inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-medium",
          navLinkClass,
          "underline-offset-4 hover:underline"
        )}
      >
        <ArrowLeft className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
        Back
      </button>
    </div>
  )
}
