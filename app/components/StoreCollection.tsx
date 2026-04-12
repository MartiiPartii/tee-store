import ShirtCard from "./ShirtCard"
import { Shirt } from "../generated/prisma"

const StoreCollection = async ({ collection }: { collection: Shirt[] }) => {
  return (
    <div className="grid w-full grid-cols-12 gap-x-6 gap-y-12 text-left sm:gap-x-8 sm:gap-y-14">
      {collection.map((shirt: Shirt, i: number) => (
        <ShirtCard key={i} shirt={shirt} />
      ))}
    </div>
  )
}

export default StoreCollection
