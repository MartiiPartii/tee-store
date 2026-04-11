"use client"

import Form from "next/form"
import FormInputField from "./FormInputField"
import { useActionState } from "react"
import { purchase } from "@/actions/purchase"
import { UserShippingInfo } from "@/types/shipping"
import { MapPin, Shirt } from "lucide-react"
import Loader from "./Loader"
import { Label } from "@/components/ui/label"

const selectUnderlineClass =
  "flex h-11 w-full cursor-pointer appearance-none rounded-none border-0 border-b border-border bg-brand-bg px-0 py-2 text-sm text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"

const PurchaseForm = ({
  user,
  productId,
}: {
  user: UserShippingInfo
  productId: number
}) => {
  const [state, formAction, isLoading] = useActionState(purchase, null)

  return (
    <>
      {isLoading && <Loader />}
      <Form id="purchase" action={formAction} className="text-start">
        <input hidden name="itemId" value={productId} readOnly />

        <section className="mb-10">
          {state?.error ? (
            <p
              className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {state.error}
            </p>
          ) : null}

          <div className="mb-6 flex flex-row items-start gap-3">
            <Shirt className="mt-0.5 size-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="ui-section-label mb-1">Item</p>
              <h2 className="ui-card-title">Product settings</h2>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="size-select">Size</Label>
              <select
                id="size-select"
                name="itemSize"
                defaultValue="XS"
                className={selectUnderlineClass}
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
          </div>
        </section>

        <section className="border-t border-border pt-10">
          <div className="mb-6 flex flex-row items-start gap-3">
            <MapPin className="mt-0.5 size-6 shrink-0 text-primary" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="ui-section-label mb-1">Delivery</p>
              <h2 className="ui-card-title">Shipping information</h2>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-12 gap-5 gap-y-5 sm:gap-x-5">
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
