"use client"
import { montserrat } from '@/app/fonts'
import { createTheme } from '@mui/material/styles'

/** Sage Calm Minimal — single source of truth for brand colors */
// export const brandPalette = {
//     background: "#FAF8F2",
//     foreground: "#E7E3DA",
//     accent: "#AFC8B3",
//     text: "#2D332F",
// } as const
/** Soft Blush Boutique — single source of truth for brand colors */
// export const brandPalette = {
//     background: "#FFF7F4",
//     foreground: "#F2E6E2",
//     accent: "#F6B6C8",
//     text: "#2E2A2A",
// } as const
/** Lavender Dreamy Modern — single source of truth for brand colors */
// export const brandPalette = {
//     background: "#FBFAFF",
//     foreground: "#ECE8F5",
//     accent: "#CBB7F5",
//     text: "#2B2B35",
// } as const
/** Peach Warm Cozy — single source of truth for brand colors */
// export const brandPalette = {
//     background: "#FFF6F0",
//     foreground: "#F2E2D6",
//     accent: "#F6B38E",
//     text: "#352D2A",
// } as const
/** High-End Neutral + Pastel Accent — single source of truth for brand colors */
export const brandPalette = {
    background: "#F9F9F6",
    foreground: "#E8E5DF",
    accent: "#C8BDF4",
    text: "#1F1F1F",
} as const

/** Secondary / supporting text (muted from `text`) */
const textMuted = "rgba(45, 51, 47, 0.62)"

const headingStyles = {
    fontWeight: 700
}

let theme = createTheme({
    cssVariables: true,
    shape: {
        borderRadius: "0.75rem"
    },
    typography: {
        fontFamily: montserrat.style.fontFamily,
        h1: { ...headingStyles, fontSize: "3.2rem" },
        h2: { ...headingStyles, fontSize: "2rem" },
        h3: { ...headingStyles, fontSize: "1.5rem" },
        h4: { ...headingStyles, fontSize: "1.2rem" },
        h5: { ...headingStyles, fontSize: "1rem" },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.875rem" }
    },
    palette: {
        bgcolor: {
            main: brandPalette.background,
            secondary: brandPalette.foreground,
            contrastText: brandPalette.text,
        },
        primary: {
            main: brandPalette.text,
            contrastText: brandPalette.background,
        },
        accent: {
            main: brandPalette.accent,
            contrastText: brandPalette.text,
        },
        neutral: {
            main: brandPalette.text,
            light: textMuted,
        },
        border: {
            main: "#D4D0C8",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation3: {
                    boxShadow: "0 0 12px rgba(45, 51, 47, 0.08)",
                }
            }
        }
    }
})

theme = createTheme(theme, {
    typography: {
        body1: {
            color: theme.palette.neutral.light
        },
        body2: {
            color: theme.palette.neutral.light
        }
    }
})

export default theme
