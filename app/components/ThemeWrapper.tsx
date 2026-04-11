"use client"

import React from "react"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-brand-bg text-foreground">{children}</div>
  )
}

export default ThemeWrapper
