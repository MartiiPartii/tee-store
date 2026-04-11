import { OrderDetailsInterface } from "@/types/order"

const PdfPreview = ({ order }: { order: OrderDetailsInterface }) => {
  return (
    <div
      className="mb-8 w-full overflow-auto rounded-2xl border border-border bg-brand-bg p-8 text-start sm:p-12"
      id="preview"
    >
      <p className="ui-section-label mb-2">Receipt</p>
      <h2 className="ui-page-title mb-2">Order №{order.id}</h2>
      <p className="mb-6 text-sm text-brand-muted">
        Placed on {order.date.getDate()}/{order.date.getMonth()}/
        {order.date.getFullYear()}
      </p>

      <p className="text-sm text-brand-muted">
        Receiver:{" "}
        <span className="font-medium text-primary">
          {order.firstName} {order.lastName}
        </span>
      </p>
      <p className="text-sm text-brand-muted">
        Phone:{" "}
        <span className="font-medium text-primary">{order.phone}</span>
      </p>
      <p className="mb-8 text-sm text-brand-muted">
        Shipment Address:{" "}
        <span className="font-medium text-primary">{order.address}</span>
      </p>

      <h3 className="ui-card-title mb-4">Products</h3>

      <table className="mb-16 w-full border-collapse text-start text-sm">
        <thead className="bg-brand-surface font-medium text-brand-text">
          <tr>
            <th className="border-b border-border p-2 text-left">Product</th>
            <th className="border-b border-border p-2 text-left">Sold by</th>
            <th className="border-b border-border p-2 text-left">Size</th>
            <th className="border-b border-border p-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="last:border-0">
            <td className="border-b border-border p-2 align-top" scope="row">
              {order.item.name}
            </td>
            <td className="border-b border-border p-2 align-top">
              {order.item.soldByPlatform
                ? "Tee Store"
                : `${order.item.seller?.firstName} ${order.item.seller?.lastName}`}
            </td>
            <td className="border-b border-border p-2 align-top">
              {order.itemSize}
            </td>
            <td className="border-b border-border p-2 align-top">
              ${order.item.price}
            </td>
          </tr>
        </tbody>
      </table>

      <h4 className="ui-card-title mb-2">Thank you</h4>
      <p className="text-sm text-brand-muted">
        Thank you for ordering from TeeStore. We hope you had a good experience
        on our platform.
      </p>
    </div>
  )
}

export default PdfPreview
