"use client"

import ImageInput from "./ImageInput"
import React, { useActionState, useState } from "react"
import FormInputField from "./FormInputField"
import { DollarSign, Plus } from "lucide-react"
import Form from "next/form"
import { uploadShirt } from "@/actions/store"
import Loader from "./Loader"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const ShirtForm = () => {
  const [file, setFile] = useState<File | null>(null)
  const [state, action, isLoading] = useActionState(
    (previousState: any, formData: FormData) =>
      uploadShirt(previousState, formData, file),
    null
  )
  const router = useRouter()

  return (
    <>
      {isLoading && <Loader />}
      <Form action={action} className="text-start">
        {state?.error ? (
          <p
            className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {state.error}
          </p>
        ) : null}

        <div className="mb-10">
          <ImageInput file={file} setFile={setFile} />
        </div>

        <div className="border-t border-border pt-10">
          <div className="mb-6">
            <p className="ui-section-label mb-1">Details</p>
            <h2 className="ui-card-title">Listing information</h2>
          </div>

          <div className="flex flex-col gap-5">
            <FormInputField
              label="T-Shirt Name*"
              placeholder="Enter t-shirt name"
              name="name"
              type="text"
              required={true}
            />
            <FormInputField
              label="T-Shirt Description*"
              placeholder="Describe your t-shirt, its style, material, etc."
              type="text"
              name="description"
              multiline={true}
              rows={4}
              required={true}
            />
            <FormInputField
              label="Price (USD)*"
              placeholder="0.00"
              step={0.01}
              name="price"
              type="number"
              Icon={DollarSign}
              required={true}
            />
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                variant="outlinePrimary"
                className="w-full sm:flex-1"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" size="lg" className="w-full sm:flex-1">
                <Plus className="size-4" />
                List T-Shirt
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default ShirtForm
