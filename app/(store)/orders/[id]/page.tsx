import SectionContainer from "@/app/components/SectionContainer"
import { MapPin } from "lucide-react"
import Image from "next/image"
import DownloadPdf from "@/app/components/DownloadPdf"
import { getOrder } from "@/actions/orders"
import Link from "next/link"
import { Card } from "@/components/ui/card"

const OrderDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const encodedId = (await params).id
  const b64id = decodeURIComponent(encodedId)
  const id = Number(atob(b64id))

  const order = await getOrder(id)

  return (
    order && (
      <SectionContainer props={{ className: "ui-page-section" }}>
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <p className="ui-section-label">Order detail</p>
            <h1 className="ui-page-title">Order №{order.id}</h1>
            <p className="text-sm text-brand-muted">
              Placed on {order.date.toDateString()}
            </p>
          </div>

          <DownloadPdf order={order} />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Card className="p-6 sm:p-8">
              <h2 className="ui-card-title mb-6">Ordered item</h2>

              <div className="grid grid-cols-12 gap-4 sm:gap-12">
                <div className="col-span-12 sm:col-span-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                    <Image
                      src={order.item.imageLink}
                      alt="Product Image"
                      width={100}
                      height={100}
                      style={{
                        height: "auto",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        borderRadius: "1rem",
                      }}
                    />

                    <div className="flex flex-col gap-1">
                      <Link href={`/shirt/${btoa(String(order.item.id))}`}>
                        <p className="font-medium text-primary transition-colors hover:text-primary/80">
                          {order.item.name}
                        </p>
                      </Link>
                      <p className="mb-2 text-sm text-brand-muted">
                        {order.item.description.length > 100
                          ? `${order.item.description.substring(0, 100)}...`
                          : order.item.description}
                      </p>
                      <p className="text-sm text-brand-muted">
                        Product size:{" "}
                        <span className="text-brand-muted">{order.itemSize}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 flex flex-col items-start sm:col-span-4 sm:items-end">
                  <p className="text-xl font-semibold text-primary">${order.item.price}</p>
                  <p className="text-sm text-brand-muted">
                    Sold by{" "}
                    <span className="text-primary">
                      {order.item.soldByPlatform
                        ? "TeeStore"
                        : `${order.item.seller?.firstName} ${order.item.seller?.lastName}`}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-12">
            <Card className="p-6 sm:p-8">
              <div className="mb-6 flex flex-row items-center gap-3">
                <MapPin
                  className="size-7 shrink-0 text-primary"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div>
                  <p className="ui-section-label mb-1">Delivery</p>
                  <h2 className="ui-card-title">Shipping details</h2>
                </div>
              </div>

              <p className="mb-2 text-base text-brand-muted">
                Receiver:{" "}
                <span className="text-brand-muted">
                  {order.firstName} {order.lastName}
                </span>
              </p>
              <p className="mb-2 text-base text-brand-muted">
                Phone Number:{" "}
                <span className="text-brand-muted">{order.phone}</span>
              </p>
              <p className="mb-2 text-base text-brand-muted">
                Shipment Address:{" "}
                <span className="text-brand-muted">{order.address}</span>
              </p>
            </Card>
          </div>
        </div>
      </SectionContainer>
    )
  )
}

export default OrderDetails
