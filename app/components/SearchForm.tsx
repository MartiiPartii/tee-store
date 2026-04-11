import Form from "next/form"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const SearchForm = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Form action="/browse" className="w-full">
        <div className="relative w-full">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-brand-muted"
            aria-hidden
          />
          <Input
            name="search"
            placeholder="Search"
            className="h-10 w-full pl-10 text-sm"
          />
        </div>
      </Form>
    </div>
  )
}

export default SearchForm
