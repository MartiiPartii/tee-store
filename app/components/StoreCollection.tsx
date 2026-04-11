import ShirtCard from "./ShirtCard"
import { Shirt } from "../generated/prisma"

const StoreCollection = async ({ collection }: { collection: Shirt[] }) => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {collection.map((shirt: Shirt, i: number) => (
        <ShirtCard key={i} shirt={shirt} />
      ))}
    </div>
  )
}

export default StoreCollection
