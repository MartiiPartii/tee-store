"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SimilarProductsCarousel({
  children,
}: {
  children: React.ReactNode
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = Math.max(el.clientWidth * 0.85, 300)
    el.scrollBy({ left: direction * delta, behavior: "smooth" })
  }

  return (
    <section
      className="mt-16 border-t border-border pt-14 md:mt-20 md:pt-16"
      aria-labelledby="similar-products-heading"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="ui-section-label mb-2">You might also like</p>
          <h2 id="similar-products-heading" className="ui-section-title">
            Similar products
          </h2>
        </div>
        <div className="flex shrink-0 gap-2 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-border bg-brand-bg"
            onClick={() => scroll(-1)}
            aria-label="Show previous products"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-border bg-brand-bg"
            onClick={() => scroll(1)}
            aria-label="Show more products"
          >
            <ChevronRight className="size-5" aria-hidden />
          </Button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-1 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </section>
  )
}
