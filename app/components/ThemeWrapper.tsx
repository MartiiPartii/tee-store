"use client"

import React from "react"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-foreground">
      {children}
    </div>
  )
}

export default ThemeWrapper
