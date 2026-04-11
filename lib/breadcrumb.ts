/**
 * Human-readable labels for URL path segments (pathname without leading slash).
 */
const SEGMENT_LABELS: Record<string, string> = {
  browse: "Browse",
  "sell-tshirt": "Sell T-Shirt",
  orders: "Orders",
  shirt: "Product",
  profile: "Profile",
  login: "Login",
  register: "Register",
  "my-shirts": "My Shirts",
  verify: "Verify",
  purchase: "Checkout",
}

function titleCaseSegment(segment: string): string {
  if (segment.length > 24 && /^[A-Za-z0-9+/=_-]+$/.test(segment)) {
    return "Details"
  }
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

export type BreadcrumbItem = {
  href: string
  label: string
}

/**
 * Builds breadcrumb trail for the app router pathname (e.g. /browse, /shirt/abc/purchase).
 * Returns null for the home page (no trail).
 */
export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] | null {
  const normalized =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname

  if (normalized === "" || normalized === "/") {
    return null
  }

  const parts = normalized.split("/").filter(Boolean)
  const home: BreadcrumbItem = { href: "/", label: "Home" }

  // /profile/orders/:id
  if (parts[0] === "profile" && parts[1] === "orders" && parts.length === 3) {
    return [
      home,
      { href: "/profile", label: "Profile" },
      { href: "/profile/orders", label: "Orders" },
      { href: normalized, label: "Order" },
    ]
  }

  // /profile/orders
  if (parts[0] === "profile" && parts[1] === "orders" && parts.length === 2) {
    return [
      home,
      { href: "/profile", label: "Profile" },
      { href: normalized, label: "Orders" },
    ]
  }

  // /shirt/:id/purchase
  if (parts[0] === "shirt" && parts[1] && parts[2] === "purchase") {
    return [
      home,
      { href: `/shirt/${parts[1]}`, label: "Product" },
      { href: normalized, label: "Checkout" },
    ]
  }

  // /shirt/:id
  if (parts[0] === "shirt" && parts.length === 2) {
    return [home, { href: normalized, label: "Product" }]
  }

  // /verify/:uidb/:token
  if (parts[0] === "verify" && parts.length >= 3) {
    return [
      home,
      { href: "/verify", label: "Verify" },
      { href: normalized, label: "Confirm email" },
    ]
  }

  // /verify
  if (parts[0] === "verify" && parts.length === 1) {
    return [home, { href: normalized, label: "Verify" }]
  }

  // Default: one crumb per segment
  const out: BreadcrumbItem[] = [home]
  let acc = ""
  for (let i = 0; i < parts.length; i++) {
    acc += `/${parts[i]}`
    const label = SEGMENT_LABELS[parts[i]] ?? titleCaseSegment(parts[i])
    out.push({ href: acc, label })
  }

  return out
}
