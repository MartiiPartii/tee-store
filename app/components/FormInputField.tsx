"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputProps } from "@/types/form"
import { cn } from "@/lib/utils"

const FormInputField = ({
  label,
  placeholder,
  defaultValue,
  name,
  multiline,
  required,
  step,
  rows,
  type,
  Icon,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const hasPasswordToggle = type === "password"

  if (multiline) {
    return (
      <div className="flex flex-col gap-2 text-start">
        {label && <Label>{label}</Label>}
        <textarea
          placeholder={placeholder}
          defaultValue={defaultValue ? defaultValue : ""}
          name={name ? name : ""}
          required={required ? true : false}
          rows={rows}
          className="flex min-h-[88px] w-full rounded-2xl border border-border bg-brand-bg px-4 py-3 text-sm normal-case text-foreground placeholder:text-brand-muted placeholder:normal-case focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 text-start">
      {label && <Label>{label}</Label>}

      <div className="relative">
        {Icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-brand-muted">
            <Icon className="size-4" />
          </span>
        )}
        <Input
          placeholder={placeholder}
          defaultValue={defaultValue ? defaultValue : ""}
          name={name ? name : ""}
          required={required ? true : false}
          step={step !== undefined ? step : type === "number" ? 1 : undefined}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={cn(
            "text-sm",
            Icon && "pl-10",
            hasPasswordToggle && "pr-10"
          )}
        />
        {hasPasswordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="iconSm"
            className="absolute right-0.5 top-1/2 h-9 w-9 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

export default FormInputField
