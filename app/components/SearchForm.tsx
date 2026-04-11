import Form from "next/form"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const SearchForm = () => {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center">
      <Form action="/browse" className="w-full max-w-md">
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-brand-muted"
            aria-hidden
          />
          <Input
            name="search"
            placeholder="Search"
            className="h-9 w-full rounded-full border-border bg-brand-bg pl-10 text-sm shadow-none placeholder:text-brand-muted focus-visible:ring-primary/20"
          />
        </div>
      </Form>
    </div>
  )
}

export default SearchForm
