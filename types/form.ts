import type { LucideIcon } from "lucide-react"

export interface InputProps {
  label: string
  placeholder: string
  defaultValue?: string
  name?: string
  step?: number
  type: string
  required?: boolean
  multiline?: boolean
  rows?: number
  Icon?: LucideIcon | null
}

export interface FormProps {
  /** Small caps label above the title (matches .ui-section-label across the app). */
  sectionLabel?: string
  /** Auth forms use line inputs; leave default elsewhere. */
  inputStyle?: "default" | "underline"
  title: string
  description: string
  inputs: InputProps[]
  buttonLabel: string
  actionCallback: (prevState: any, formData: FormData) => any
  link: {
    text: string
    label: string
    to: string
  }
}
