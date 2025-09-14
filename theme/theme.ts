"use client"
import { createTheme } from '@mui/material/styles'

const headingStyles = {
    fontWeight: 700
}

let theme = createTheme({
    cssVariables: true,
    shape: {
        borderRadius: "0.75rem"
    },
    typography: {
        fontFamily: "var(--font-inter)",
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
            main: "#fcfcfc",
            secondary: "#f4f4f5",
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
        },
        border: {
            main: "#e4e4e7"
        }
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
                elevation3: ({ theme }) => ({
                    boxShadow: `0 0 12px ${theme.palette.neutral.light}`
                    // boxShadow: `0 0 24px red`
                })
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