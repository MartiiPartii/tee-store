const boxClass =
  "flex size-10 shrink-0 items-center justify-center rounded border border-border/60 text-primary/50 shadow-sm transition-colors hover:text-primary/75 sm:size-11"

/**
 * Stylized payment marks — single-tone to match the footer (not official brand assets).
 */
export function PaymentMethodLogos() {
  return (
    <ul
      className="flex flex-wrap items-center justify-center gap-2 sm:justify-start sm:gap-2.5"
      aria-label="Accepted payment methods"
    >
      <li className={boxClass}>
        <svg viewBox="0 0 44 14" className="h-[1.4rem] w-[2.75rem] sm:h-6 sm:w-11" aria-hidden>
          <text
            x="22"
            y="7"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            fontFamily="system-ui, sans-serif"
            fontSize="11"
            fontWeight="700"
            fontStyle="italic"
            letterSpacing="-0.02em"
          >
            VISA
          </text>
        </svg>
      </li>
      <li className={boxClass}>
        <svg viewBox="0 0 40 24" className="h-7 w-[2.85rem] sm:h-8 sm:w-[3.15rem]" aria-hidden>
          <circle cx="15" cy="12" r="8.5" fill="currentColor" opacity="0.9" />
          <circle cx="25" cy="12" r="8.5" fill="currentColor" opacity="0.4" />
        </svg>
      </li>
      <li className={boxClass}>
        <svg
          viewBox="0 0 64 20"
          className="h-8 w-[2.35rem] sm:h-[2.35rem] sm:w-[2.6rem]"
          aria-hidden
        >
          <text
            x="32"
            y="10"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            fontFamily="system-ui, sans-serif"
            fontSize="16"
            fontWeight="600"
            letterSpacing="-0.04em"
          >
            PayPal
          </text>
        </svg>
      </li>
    </ul>
  )
}
