"use client"
import { createTheme } from '@mui/material/styles'

declare module "@mui/material/styles" {
    interface Palette {
        bgcolor: Palette["primary"],
        accent: Palette["primary"]
    }
    interface PaletteOptions {
        bgcolor?: PaletteOptions["primary"],
        accent?: PaletteOptions["primary"]
    }
}

export const theme = createTheme({
    shape: {
        borderRadius: "0.75rem"
    },
    typography: {
        h1: { fontSize: "4.5rem" },
        h2: { fontSize: "1.875rem" },
        h3: { fontSize: "1.125rem" }
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
        }
    }
})