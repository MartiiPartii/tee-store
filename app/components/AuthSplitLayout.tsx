import Image from "next/image"
import type { ReactNode } from "react"
import AuthBackButton from "./AuthBackButton"

/**
 * Auth split: no image on small screens; from lg — image ~1/3 (sticky 100vh), form ~2/3.
 */
export default function AuthSplitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-[100vh] flex-1 grid-cols-1 bg-brand-bg lg:grid-cols-[1fr_2fr] lg:grid-rows-1 lg:items-start">
      <div className="relative hidden w-full overflow-hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:max-h-screen lg:self-start lg:border-r lg:border-border">
        <Image
          src="/login/login.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1023px) 0px, 33vw"
        />
      </div>

      <div className="flex min-h-0 flex-col justify-center bg-brand-bg px-6 py-10 sm:px-10 lg:justify-start lg:px-12 lg:py-16 xl:px-16">
        <div className="mx-auto w-full max-w-lg">
          <AuthBackButton />
          {children}
        </div>
      </div>
    </div>
  )
}
