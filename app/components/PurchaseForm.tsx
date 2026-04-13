"use client"

import Form from "next/form"
import FormInputField from "./FormInputField"
import { useActionState, useState } from "react"
import { purchase } from "@/actions/purchase"
import { UserShippingInfo } from "@/types/shipping"
import { MapPin, Shirt } from "lucide-react"
import Loader from "./Loader"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"] as const

/** Matches browse filter triggers (BrowseToolbar `selectTriggerClass`). */
const selectTriggerClass = "w-full rounded-full border-border bg-brand-bg"

const PurchaseForm = ({
  user,
  productId,
}: {
  user: UserShippingInfo
  productId: number
}) => {
  const [state, formAction, isLoading] = useActionState(purchase, null)
  const [itemSize, setItemSize] = useState<string>("XS")

  return (
    <>
      {isLoading && <Loader />}
      <Form
        id="purchase"
        action={formAction}
        className="flex flex-col gap-8 text-start sm:gap-10"
      >
        <input hidden name="itemId" value={productId} readOnly />
        <input type="hidden" name="itemSize" value={itemSize} readOnly />

        <section className="flex flex-col gap-4">
          {state?.error ? (
            <p
              className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3.5 text-sm leading-relaxed text-destructive"
              role="alert"
            >
              {state.error}
            </p>
          ) : null}

          <div className="flex flex-row items-start gap-3.5 sm:gap-4">
            <Shirt
              className="mt-0.5 size-6 shrink-0 text-primary sm:size-7"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="ui-section-label">Item</p>
              <h2 className="ui-card-title">Product settings</h2>
            </div>
          </div>

          <div className="flex min-w-0 max-w-md flex-col gap-2">
            <Label htmlFor="size-select" className="ui-section-label">
              Size
            </Label>
            <Select value={itemSize} onValueChange={setItemSize}>
              <SelectTrigger id="size-select" className={selectTriggerClass}>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="flex flex-col gap-8 border-t border-border pt-10 sm:gap-9 sm:pt-12">
          <div className="flex flex-row items-start gap-3.5 sm:gap-4">
            <MapPin
              className="mt-0.5 size-6 shrink-0 text-primary sm:size-7"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="min-w-0">
              <p className="ui-section-label">Delivery</p>
              <h2 className="ui-card-title">Shipping information</h2>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-12 gap-x-5 gap-y-6 sm:gap-x-6">
              <div className="col-span-12 sm:col-span-6">
                <FormInputField
                  label="First Name"
                  placeholder="Ivan"
                  defaultValue={user.firstName}
                  type="text"
                  name="firstName"
                  required={true}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <FormInputField
                  label="Last Name"
                  placeholder="Ivanov"
                  defaultValue={user.lastName}
                  type="text"
                  name="lastName"
                  required={true}
                />
              </div>
            </div>
            <FormInputField
              label="Address"
              placeholder="Petar Dertliev 13 blvd."
              defaultValue={user.address}
              type="text"
              name="address"
              required={true}
            />
            <FormInputField
              label="Phone Number"
              placeholder="+359 88 888 888"
              defaultValue={user.phoneNumber}
              name="phone"
              type="text"
              required={true}
            />
          </div>
        </section>
      </Form>
    </>
  )
}

export default PurchaseForm
