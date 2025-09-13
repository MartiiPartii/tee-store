"use client"
import { createTheme } from '@mui/material/styles'

declare module "@mui/material/styles" {
    interface Palette {
        bgcolor: Palette["primary"],
        accent: Palette["primary"],
        neutral: Palette["primary"]
    }
    interface PaletteOptions {
        bgcolor?: PaletteOptions["primary"],
        accent?: PaletteOptions["primary"],
        neutral?: PaletteOptions["primary"]
    }
}

const headingStyles = {
    fontWeight: 700
}

let theme = createTheme({
    shape: {
        borderRadius: "0.75rem"
    },
    typography: {
        fontFamily: ["Inter", 'sans-serif'].join(","),
        h1: { ...headingStyles, fontSize: "3.2rem" },
        h2: { ...headingStyles, fontSize: "2rem" },
        h3: { ...headingStyles, fontSize: "1.5rem" },
        h4: { ...headingStyles },
        h5: { ...headingStyles },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.875rem" }
    },
    palette: {
        bgcolor: {
            main: "#fcfcfc",
            contrastText: "#09090b"
        },
        primary: {
            main: "#18181b",
            contrastText: "#fafafa"
        },
        accent: {
            main: "#16a249",
            contrastText: "#fafafa"
        },
        neutral: {
            main: "#000",
            light: "#71717a"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
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