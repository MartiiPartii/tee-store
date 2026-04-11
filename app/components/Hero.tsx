"use client"

import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { alpha } from "@mui/material/styles"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HeroStat from "./HeroStat";
import Link from "next/link";
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { brandPalette } from "@/theme/brand-colors"

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
        <Stack
            position="relative"
            sx={{
                minHeight: "100vh",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }} aria-hidden>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: top === 0 ? 1 : 0,
                        transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
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
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: top === 1 ? 1 : 0,
                        transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
                    }}
                >
                    <Image
                        src={HERO_IMAGES[img1]}
                        alt=""
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background: `linear-gradient(${alpha(brandPalette.text, 0.52)}, ${alpha(brandPalette.text, 0.52)})`,
                    pointerEvents: "none",
                }}
            />
            <Stack
                sx={{
                    position: "relative",
                    zIndex: 2,
                    alignItems: "center",
                    textAlign: "center",
                    maxWidth: "48rem",
                    margin: "0 auto",
                    p: { xs: 2, sm: 4, md: 8 },
                }}
            >
                <Typography variant="h1" color="primary.contrastText">Express yourself</Typography>
                <Typography variant="h1" mb={1} color="accent">Through Style</Typography>

                <Typography variant="body1" color="primary.contrastText" mb={3} fontSize={24}>Discover unique t-shirts from our curated collection and talented designers worldwide. Quality meets creativity.</Typography>

                <Link href={"/browse"}><Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon sx={{ width: "1.2rem", height: "1.2rem" }} />}>Shop collection</Button></Link>

                <Grid mt={6} spacing={2} container width={"100%"}>
                    <HeroStat
                        stat="10K+"
                        label="Happy Customers"
                    />
                    <HeroStat
                        stat="500K+"
                        label="Unique Designs"
                    />
                    <HeroStat
                        stat="100+"
                        label="Artists"
                    />
                </Grid>
            </Stack>
        </Stack>
    )
}

export default Hero
