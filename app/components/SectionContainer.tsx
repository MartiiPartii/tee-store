import React from "react"

import { cn } from "@/lib/utils"

const SectionContainer = ({
  children,
  props,
}: {
  children: React.ReactNode
  props?: React.HTMLAttributes<HTMLDivElement>
}) => {
  const { className, ...rest } = props || {}
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default SectionContainer
