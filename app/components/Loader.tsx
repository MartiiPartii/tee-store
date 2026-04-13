import { cn } from "@/lib/utils"

const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/85 backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className={cn(
          "flex min-w-[min(20rem,calc(100vw-2rem))] flex-col items-center gap-6 rounded-2xl border border-border bg-background px-10 py-9 shadow-soft sm:px-12",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        <p className="ui-section-label">Loading</p>

        <div className="relative size-14" aria-hidden>
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-transparent border-t-primary",
              "animate-loaderspin motion-reduce:animate-none"
            )}
          />
        </div>

        <p className="max-w-[14rem] text-center text-xs leading-relaxed text-brand-muted">
          Please wait a moment.
        </p>
      </div>
    </div>
  )
}

export default Loader
