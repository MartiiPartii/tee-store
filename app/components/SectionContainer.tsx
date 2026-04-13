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
      className={cn("layout-container", className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default SectionContainer
