import FormInputField from "./FormInputField"
import Link from "next/link"
import React, { useActionState } from "react"
import { FormProps } from "@/types/form"
import Form from "next/form"
import Loader from "./Loader"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const AuthForm = ({
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
      <Card className="mx-auto w-full max-w-md p-6 text-center">
        <div className="mb-6 flex flex-col gap-2">
          <h2 className="text-[1.5rem] font-bold text-brand-text">{title}</h2>
          <p className="text-sm text-brand-muted">{description}</p>
          {state && state.error && (
            <p className="text-sm italic text-destructive">{state.error}</p>
          )}
        </div>

        <div className="mb-6">
          {inputs && inputs.length > 0 && (
            <Form action={action}>
              <div className="mb-6 flex flex-col gap-4">
                {inputs.map((input, i) => (
                  <FormInputField {...input} key={i} />
                ))}
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full"
                size="lg"
              >
                {buttonLabel}
              </Button>
            </Form>
          )}
        </div>

        <p className="text-sm text-brand-muted">
          {link.text}{" "}
          <Link href={link.to}>
            <span className="font-medium text-primary">{link.label}</span>
          </Link>
        </p>
      </Card>
    </>
  )
}

export default AuthForm
