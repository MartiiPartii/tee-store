"use client"
import { montserrat } from '@/app/fonts'
import { alpha, createTheme } from '@mui/material/styles'
import { brandBorder, brandPalette } from './brand-colors'

const softShadow = "0 2px 14px rgba(44, 40, 37, 0.07)"
const softShadowHover = "0 4px 20px rgba(44, 40, 37, 0.1)"

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
        h1: { ...headingStyles, fontSize: "3.2rem", color: brandPalette.text },
        h2: { ...headingStyles, fontSize: "2rem", color: brandPalette.text },
        h3: { ...headingStyles, fontSize: "1.5rem", color: brandPalette.text },
        h4: { ...headingStyles, fontSize: "1.2rem", color: brandPalette.text },
        h5: { ...headingStyles, fontSize: "1rem", color: brandPalette.text },
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
            dark: brandPalette.accentHover,
            contrastText: brandPalette.text,
        },
        neutral: {
            main: brandPalette.text,
            light: alpha(brandPalette.text, 0.62),
        },
        border: {
            main: brandBorder,
        },
        text: {
            primary: brandPalette.text,
            secondary: alpha(brandPalette.text, 0.62),
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: brandPalette.background,
                    color: brandPalette.text,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "0.75rem",
                    boxShadow: "none",
                },
                contained: {
                    boxShadow: softShadow,
                    "&:hover": {
                        boxShadow: softShadowHover,
                    },
                },
                containedPrimary: {
                    "&:hover": {
                        backgroundColor: alpha(brandPalette.text, 0.92),
                    },
                },
                outlined: {
                    borderWidth: 1,
                },
                text: {
                    "&:hover": {
                        backgroundColor: alpha(brandPalette.accent, 0.12),
                    },
                },
                textPrimary: {
                    "&:hover": {
                        backgroundColor: alpha(brandPalette.text, 0.06),
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "0.75rem",
                    boxShadow: softShadow,
                    backgroundColor: brandPalette.foreground,
                    borderColor: brandBorder,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
                elevation1: { boxShadow: softShadow },
                elevation2: { boxShadow: softShadow },
                elevation3: { boxShadow: softShadow },
                elevation4: { boxShadow: softShadowHover },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    boxShadow: softShadow,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "0.75rem",
                    backgroundColor: alpha(brandPalette.foreground, 0.65),
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha(brandPalette.text, 0.28),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: brandPalette.accent,
                        borderWidth: "1px",
                    },
                },
                notchedOutline: {
                    borderColor: brandBorder,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: brandPalette.foreground,
                    borderLeft: `1px solid ${brandBorder}`,
                },
            },
        },
    },
})

theme = createTheme(theme, {
    typography: {
        body1: {
            color: theme.palette.text.secondary
        },
        body2: {
            color: theme.palette.text.secondary
        }
    },
})

export default theme
