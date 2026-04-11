import { OrderDetailsInterface } from "@/types/order"

const PdfPreview = ({ order }: { order: OrderDetailsInterface }) => {
  return (
    <div
      className="mb-8 w-full overflow-auto rounded-xl bg-brand-surface p-12 text-start"
      id="preview"
    >
      <h2 className="text-[2rem] font-bold text-brand-text">
        Order №{order.id}
      </h2>
      <p className="mb-2 text-base text-brand-muted">
        Placed on {order.date.getDate()}/{order.date.getMonth()}/
        {order.date.getFullYear()}
      </p>

      <p className="text-base text-brand-muted">
        Receiver:{" "}
        <span className="text-lg font-semibold text-brand-text">
          {order.firstName} {order.lastName}
        </span>
      </p>
      <p className="text-base text-brand-muted">
        Phone:{" "}
        <span className="text-lg font-semibold text-brand-text">
          {order.phone}
        </span>
      </p>
      <p className="mb-8 text-base text-brand-muted">
        Shipment Address:{" "}
        <span className="text-lg font-semibold text-brand-text">
          {order.address}
        </span>
      </p>

      <h3 className="mb-4 text-[1.5rem] font-bold text-brand-text">Products</h3>

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
                : `${order.item.seller?.firstName} ${order.item.seller?.firstName}`}
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

      <h4 className="text-[1.2rem] font-bold text-brand-text">Thank you!</h4>
      <p className="text-base text-brand-muted">
        Thank you for ordering from TeeStore. We hope you had a good experience
        on our platform.
      </p>
    </div>
  )
}

export default PdfPreview
