import { OrderDetailsInterface } from "@/types/order"
import { forwardRef } from "react"

/** Hex / plain colors only — html2canvas (html2pdf) cannot parse `color-mix()` etc. */
const c = {
  text: "#2c2825",
  muted: "#756e69",
  bg: "#f6f4f0",
  surface: "#ede8e2",
  border: "#d9d2c9",
} as const

const PdfPreview = forwardRef<HTMLDivElement, { order: OrderDetailsInterface }>(
  function PdfPreview({ order }, ref) {
    const placed = `${order.date.getDate()}/${order.date.getMonth() + 1}/${order.date.getFullYear()}`

    return (
      <div
        ref={ref}
        className="mb-8 w-full overflow-auto rounded-2xl border p-8 text-start sm:p-12"
        style={{
          borderColor: c.border,
          backgroundColor: c.bg,
          color: c.text,
        }}
        id="order-pdf-preview"
      >
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: c.text }}
        >
          Receipt
        </p>
        <h2
          className="mb-2 text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: c.text }}
        >
          Order №{order.id}
        </h2>
        <p className="mb-6 text-sm" style={{ color: c.muted }}>
          Placed on {placed}
        </p>

        <p className="text-sm" style={{ color: c.muted }}>
          Receiver:{" "}
          <span className="font-medium" style={{ color: c.text }}>
            {order.firstName} {order.lastName}
          </span>
        </p>
        <p className="text-sm" style={{ color: c.muted }}>
          Phone:{" "}
          <span className="font-medium" style={{ color: c.text }}>
            {order.phone}
          </span>
        </p>
        <p className="mb-8 text-sm" style={{ color: c.muted }}>
          Shipment Address:{" "}
          <span className="font-medium" style={{ color: c.text }}>
            {order.address}
          </span>
        </p>

        <h3
          className="mb-4 text-lg font-semibold tracking-tight"
          style={{ color: c.text }}
        >
          Products
        </h3>

        <table className="mb-16 w-full border-collapse text-start text-sm">
          <thead>
            <tr style={{ backgroundColor: c.surface, color: c.text }}>
              <th
                className="p-2 text-left font-medium"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                Product
              </th>
              <th
                className="p-2 text-left font-medium"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                Sold by
              </th>
              <th
                className="p-2 text-left font-medium"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                Size
              </th>
              <th
                className="p-2 text-left font-medium"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="last:border-0">
              <td
                className="p-2 align-top"
                style={{ borderBottom: `1px solid ${c.border}` }}
                scope="row"
              >
                {order.item.name}
              </td>
              <td
                className="p-2 align-top"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                {order.item.soldByPlatform
                  ? "Tee Store"
                  : `${order.item.seller?.firstName} ${order.item.seller?.lastName}`}
              </td>
              <td
                className="p-2 align-top"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                {order.itemSize}
              </td>
              <td
                className="p-2 align-top"
                style={{ borderBottom: `1px solid ${c.border}` }}
              >
                ${order.item.price}
              </td>
            </tr>
          </tbody>
        </table>

        <h4 className="mb-2 text-lg font-semibold tracking-tight" style={{ color: c.text }}>
          Thank you
        </h4>
        <p className="text-sm" style={{ color: c.muted }}>
          Thank you for ordering from TeeStore. We hope you had a good experience
          on our platform.
        </p>
      </div>
    )
  }
)

export default PdfPreview
