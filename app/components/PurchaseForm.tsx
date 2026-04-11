"use client"

import Form from "next/form"
import FormInputField from "./FormInputField"
import { useActionState } from "react"
import { purchase } from "@/actions/purchase"
import { UserShippingInfo } from "@/types/shipping"
import { MapPin, Shirt } from "lucide-react"
import Loader from "./Loader"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const PurchaseForm = ({
  user,
  productId,
}: {
  user: UserShippingInfo
  productId: number
}) => {
  const [state, formAction, isLoading] = useActionState(purchase, null)

  const selectClass =
    "flex h-10 w-full rounded-xl border border-border bg-[color-mix(in_srgb,hsl(var(--card))_65%,transparent)] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary"

  return (
    <>
      {isLoading && <Loader />}
      <Form id="purchase" action={formAction}>
        <input hidden name="itemId" value={productId} readOnly />

        <Card className="mb-6 p-6">
          {state?.error && (
            <p className="mb-4 text-base italic text-destructive">
              {state?.error}
            </p>
          )}
          <div className="mb-6 flex flex-row items-center gap-2">
            <Shirt className="size-6 shrink-0" aria-hidden />
            <h2 className="text-[1.5rem] font-bold text-brand-text">
              Product settings
            </h2>
          </div>

          <div className="grid w-full gap-2">
            <Label htmlFor="size-select">Size</Label>
            <select
              id="size-select"
              name="itemSize"
              defaultValue="XS"
              className={selectClass}
            >
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
        </Card>
        <Card className="p-6">
          <div className="mb-4 flex flex-row items-center gap-2">
            <MapPin className="size-6 shrink-0" aria-hidden />
            <h2 className="text-[1.5rem] font-bold text-brand-text">
              Shipping information
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-12 gap-4">
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
        </Card>
      </Form>
    </>
  )
}

export default PurchaseForm
