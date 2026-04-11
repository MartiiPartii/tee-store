"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InputProps } from "@/types/form"
import { cn } from "@/lib/utils"

type Props = InputProps & {
  inputStyle?: "default" | "underline"
}

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
  inputStyle = "default",
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const hasPasswordToggle = type === "password"
  const line = inputStyle === "underline"

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
          className={cn(
            "flex min-h-[88px] w-full text-sm normal-case text-foreground placeholder:text-brand-muted placeholder:normal-case focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            line
              ? "rounded-none border-0 border-b border-border bg-brand-bg px-0 py-2 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
              : "rounded-2xl border border-border bg-brand-bg px-4 py-3 focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary"
          )}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 text-start">
      {label && <Label>{label}</Label>}

      <div className="relative">
        {Icon && (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-primary/70",
              line ? "left-0" : "left-3"
            )}
          >
            <Icon className="size-4" strokeWidth={1.5} aria-hidden />
          </span>
        )}
        <Input
          variant={line ? "underline" : "default"}
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
            Icon && (line ? "pl-8" : "pl-10"),
            hasPasswordToggle && "pr-10"
          )}
        />
        {hasPasswordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="iconSm"
            className={cn(
              "absolute top-1/2 h-9 w-9 -translate-y-1/2",
              line ? "right-0" : "right-0.5"
            )}
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
