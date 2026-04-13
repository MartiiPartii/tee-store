"use client"

import { FormEvent } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { buildBrowsePath } from "@/lib/browse-params"
import { cn } from "@/lib/utils"

type SearchFormProps = {
  /** Widen to parent (e.g. full-width mobile row). */
  fullWidth?: boolean
  /** Place the search icon on the right (mobile toolbar style). */
  iconEnd?: boolean
  className?: string
}

const SearchForm = ({
  fullWidth = false,
  iconEnd = false,
  className,
}: SearchFormProps) => {
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
          page: null,
        })
      )
    } else if (q) {
      router.push(`/browse?${new URLSearchParams({ search: q }).toString()}`)
    } else {
      router.push("/browse")
    }
  }

  return (
    <div
      className={cn(
        "flex min-w-0 items-center justify-center",
        fullWidth ? "w-full" : "flex-1",
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn("w-full", fullWidth ? "max-w-none" : "max-w-md")}
      >
        <div className="relative w-full">
          <Search
            className={cn(
              "pointer-events-none absolute top-1/2 size-[18px] -translate-y-1/2 text-brand-muted",
              iconEnd ? "right-3" : "left-3"
            )}
            aria-hidden
          />
          <Input
            key={searchFromUrl}
            name="search"
            placeholder="Search"
            defaultValue={searchFromUrl}
            className={cn(
              "h-9 w-full rounded-full border-border bg-brand-bg text-sm shadow-none placeholder:text-brand-muted focus-visible:ring-primary/20",
              iconEnd ? "pl-4 pr-10" : "pl-10 pr-3"
            )}
          />
        </div>
      </form>
    </div>
  )
}

export default SearchForm
