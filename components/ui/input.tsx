import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** `underline` = bottom border only (auth-style line inputs). Default = pill + full border. */
  variant?: "default" | "underline"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-brand-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          variant === "underline"
            ? "h-11 rounded-none border-0 border-b border-border bg-brand-bg px-0 py-2 shadow-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
            : "h-10 rounded-full border border-border bg-brand-bg px-3 py-2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
