import FormInputField from "./FormInputField"
import Link from "next/link"
import React, { useActionState } from "react"
import { FormProps } from "@/types/form"
import Form from "next/form"
import Loader from "./Loader"
import { Button } from "@/components/ui/button"

const AuthForm = ({
  sectionLabel,
  inputStyle = "underline",
  title,
  description,
  inputs,
  buttonLabel,
  actionCallback,
  link,
}: FormProps) => {
  const [state, action, isLoading] = useActionState(actionCallback, null)

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full text-start">
        <header className="mb-8 space-y-3">
          {sectionLabel ? (
            <p className="ui-section-label">{sectionLabel}</p>
          ) : null}
          <h2 className="ui-page-title text-balance">{title}</h2>
          <p className="ui-body-lead max-w-lg">{description}</p>
          {state && state.error ? (
            <p
              className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {state.error}
            </p>
          ) : null}
        </header>

        {inputs && inputs.length > 0 ? (
          <Form action={action}>
            <div className="flex flex-col gap-5">
              {inputs.map((input, i) => (
                <FormInputField
                  {...input}
                  key={i}
                  inputStyle={inputStyle}
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="default"
              className="mt-6 w-full"
              size="lg"
            >
              {buttonLabel}
            </Button>
          </Form>
        ) : null}

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-sm leading-relaxed text-brand-muted">
            {link.text}{" "}
            <Link
              href={link.to}
              className="font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline"
            >
              {link.label}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default AuthForm
