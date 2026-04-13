import SectionContainer from "@/app/components/SectionContainer"
import { MapPin } from "lucide-react"
import Image from "next/image"
import DownloadPdf from "@/app/components/DownloadPdf"
import { getOrder } from "@/actions/orders"
import Link from "next/link"

const OrderDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const encodedId = (await params).id
  const b64id = decodeURIComponent(encodedId)
  const id = Number(atob(b64id))

  const order = await getOrder(id)

  return (
    order && (
      <SectionContainer props={{ className: "ui-page-section" }}>
        <header className="border-b border-border pb-10 md:pb-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <p className="ui-section-label">Order</p>
              <h1 className="ui-page-title">Order #{order.id}</h1>
              <p className="text-sm text-brand-muted">
                Placed on {order.date.toDateString()}
              </p>
            </div>

            <DownloadPdf order={order} />
          </div>
        </header>

        <div className="space-y-12 pt-10 md:space-y-14 md:pt-12">
          <section>
            <h2 className="ui-card-title mb-6">Ordered item</h2>

            <div className="grid grid-cols-12 gap-6 sm:gap-10">
              <div className="col-span-12 sm:col-span-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <Link
                    href={`/shirt/${btoa(String(order.item.id))}`}
                    className="shrink-0 overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={order.item.imageLink}
                      alt=""
                      width={160}
                      height={160}
                      className="aspect-square w-full max-w-[10rem] object-cover sm:max-w-[11rem]"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link href={`/shirt/${btoa(String(order.item.id))}`}>
                      <p className="ui-card-title transition-colors hover:text-primary/80">
                        {order.item.name}
                      </p>
                    </Link>
                    <p className="ui-body-lead mt-2 line-clamp-4">
                      {order.item.description.length > 160
                        ? `${order.item.description.substring(0, 160)}...`
                        : order.item.description}
                    </p>
                    <p className="mt-4 text-sm text-brand-muted">
                      Size{" "}
                      <span className="font-medium text-primary">{order.itemSize}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-12 flex flex-col border-t border-border/60 pt-6 sm:col-span-4 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                <p className="text-2xl font-semibold tabular-nums tracking-tight text-primary">
                  ${order.item.price}
                </p>
                <p className="mt-2 text-sm text-brand-muted">
                  Sold by{" "}
                  <span className="font-medium text-primary">
                    {order.item.soldByPlatform
                      ? "TeeStore"
                      : `${order.item.seller?.firstName} ${order.item.seller?.lastName}`}
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-border pt-12 md:pt-14">
            <div className="mb-6 flex flex-row items-start gap-3">
              <MapPin
                className="mt-0.5 size-6 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden
              />
              <div>
                <p className="ui-section-label mb-1">Delivery</p>
                <h2 className="ui-card-title">Shipping details</h2>
              </div>
            </div>

            <div className="grid max-w-xl gap-3 text-base text-brand-muted">
              <p>
                <span className="font-semibold uppercase tracking-wider text-primary/80">
                  Receiver
                </span>
                <br />
                {order.firstName} {order.lastName}
              </p>
              <p>
                <span className="font-semibold uppercase tracking-wider text-primary/80">
                  Phone
                </span>
                <br />
                {order.phone}
              </p>
              <p>
                <span className="font-semibold uppercase tracking-wider text-primary/80">
                  Address
                </span>
                <br />
                {order.address}
              </p>
            </div>
          </section>
        </div>
      </SectionContainer>
    )
  )
}

export default OrderDetails
