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
    "flex h-10 w-full rounded-full border border-border bg-brand-bg px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

  return (
    <>
      {isLoading && <Loader />}
      <Form id="purchase" action={formAction}>
        <input hidden name="itemId" value={productId} readOnly />

        <Card className="mb-6 p-6 sm:p-8">
          {state?.error && (
            <p className="mb-4 text-sm italic text-destructive">{state?.error}</p>
          )}
          <div className="mb-6 flex flex-row items-center gap-3">
            <Shirt className="size-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="ui-section-label mb-1">Item</p>
              <h2 className="ui-card-title">Product settings</h2>
            </div>
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
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex flex-row items-center gap-3">
            <MapPin className="size-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="ui-section-label mb-1">Delivery</p>
              <h2 className="ui-card-title">Shipping information</h2>
            </div>
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
