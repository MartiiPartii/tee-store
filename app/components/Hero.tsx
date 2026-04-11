"use client"

import { ArrowRight } from "lucide-react"
import HeroStat from "./HeroStat"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const HERO_IMAGES = [
  "/hero/1.jpg",
  "/hero/2.jpg",
  "/hero/3.jpg",
  "/hero/4.jpg",
  "/hero/5.jpg",
  "/hero/6.jpg",
] as const

const TRANSITION_MS = 800
const INTERVAL_MS = 4000

const Hero = () => {
  const [top, setTop] = useState(0)
  const [img0, setImg0] = useState(0)
  const [img1, setImg1] = useState(1)
  const img0Ref = useRef(0)
  const img1Ref = useRef(1)

  useEffect(() => {
    img0Ref.current = img0
  }, [img0])

  useEffect(() => {
    img1Ref.current = img1
  }, [img1])

  useEffect(() => {
    const id = setInterval(() => {
      setTop((t) => {
        if (t === 0) {
          const next = (img0Ref.current + 1) % HERO_IMAGES.length
          img1Ref.current = next
          setImg1(next)
          return 1
        }
        const next = (img1Ref.current + 1) % HERO_IMAGES.length
        img0Ref.current = next
        setImg0(next)
        return 0
      })
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: top === 0 ? 1 : 0,
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          <Image
            src={HERO_IMAGES[img0]}
            alt=""
            fill
            priority={img0 === 0 && top === 0}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: top === 1 ? 1 : 0,
            transitionDuration: `${TRANSITION_MS}ms`,
          }}
        >
          <Image
            src={HERO_IMAGES[img1]}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(rgba(44, 40, 37, 0.52), rgba(44, 40, 37, 0.52))",
        }}
      />
      <div className="relative z-[2] mx-auto flex max-w-[48rem] flex-col items-center px-4 py-12 text-center sm:py-20 md:py-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground/85">
          Welcome
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
          Express yourself
        </h1>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl">
          Through style
        </h2>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
          Discover unique t-shirts from our curated collection and talented
          designers worldwide. Quality meets creativity.
        </p>

        <Button variant="default" size="lg" className="mt-8" asChild>
          <Link href="/browse" className="gap-2">
            Shop collection
            <ArrowRight className="size-[1.2rem]" />
          </Link>
        </Button>

        <div className="mt-14 grid w-full grid-cols-3 gap-6 sm:gap-8">
          <HeroStat stat="10K+" label="Happy Customers" />
          <HeroStat stat="500K+" label="Unique Designs" />
          <HeroStat stat="100+" label="Artists" />
        </div>
      </div>
    </div>
  )
}

export default Hero
