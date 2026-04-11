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
      <SectionContainer props={{ className: "py-24" }}>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col">
            <h1 className="mb-2 text-[2rem] font-bold text-brand-text">
              Order №{order.id}
            </h1>
            <p className="text-base text-brand-muted">
              Placed on {order.date.toDateString()}
            </p>
          </div>

          <DownloadPdf order={order} />
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Card className="p-6">
              <h2 className="mb-4 text-[1.5rem] font-bold text-brand-text">
                Ordered Item
              </h2>

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
                        borderRadius: 10,
                      }}
                    />

                    <div className="flex flex-col">
                      <Link href={`/shirt/${btoa(String(order.item.id))}`}>
                        <p className="text-base font-semibold text-brand-muted transition-colors hover:text-primary/80">
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
                  <p className="text-xl font-semibold text-brand-muted">
                    ${order.item.price}
                  </p>
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
            <Card className="p-6">
              <div className="mb-4 flex flex-row items-center gap-2">
                <MapPin className="size-8 shrink-0 text-brand-text" aria-hidden />
                <h2 className="text-[1.5rem] font-bold text-brand-text">
                  Shipping details
                </h2>
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
