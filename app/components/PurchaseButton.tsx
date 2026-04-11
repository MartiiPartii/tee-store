"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const PurchaseButton = () => {
  return (
    <Button type="submit" form="purchase" variant="accent" className="w-full">
      <ShoppingCart className="size-4" />
      Complete Order
    </Button>
  )
}

export default PurchaseButton
