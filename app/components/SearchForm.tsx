"use client"

import { FormEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { buildBrowsePath } from "@/lib/browse-params"

const SearchForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchFromUrl = searchParams.get("search") ?? ""

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const raw = (form.elements.namedItem("search") as HTMLInputElement)?.value ?? ""
    const q = raw.trim()

    if (pathname === "/browse") {
      router.push(
        buildBrowsePath(searchParams.toString(), {
          search: q || null,
        })
      )
    } else if (q) {
      router.push(`/browse?${new URLSearchParams({ search: q }).toString()}`)
    } else {
      router.push("/browse")
    }
  }

  return (
    <div className="flex min-w-0 flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-brand-muted"
            aria-hidden
          />
          <Input
            key={searchFromUrl}
            name="search"
            placeholder="Search"
            defaultValue={searchFromUrl}
            className="h-9 w-full rounded-full border-border bg-brand-bg pl-10 text-sm shadow-none placeholder:text-brand-muted focus-visible:ring-primary/20"
          />
        </div>
      </form>
    </div>
  )
}

export default SearchForm
