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
      <Form action={action}>
        {state?.error && (
          <p className="mb-4 text-base italic text-destructive">{state.error}</p>
        )}

        <ImageInput file={file} setFile={setFile} />

        <div className="mt-4 flex flex-col gap-4">
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
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outlinePrimary"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" className="flex-1">
              <Plus className="size-4" />
              List T-Shirt
            </Button>
          </div>
        </div>
      </Form>
    </>
  )
}

export default ShirtForm
