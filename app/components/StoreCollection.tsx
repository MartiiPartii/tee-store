import ShirtCard from "./ShirtCard"
import type { CatalogShirt } from "@/types/shirt"

const StoreCollection = ({ collection }: { collection: CatalogShirt[] }) => {
  return (
    <div className="grid w-full grid-cols-12 gap-x-6 gap-y-12 text-left sm:gap-x-8 sm:gap-y-14">
      {collection.map((shirt) => (
        <ShirtCard key={shirt.id} shirt={shirt} />
      ))}
    </div>
  )
}

export default StoreCollection
