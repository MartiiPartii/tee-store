"use client"
import theme from "@/theme/theme"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import React from "react"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box bgcolor="bgcolor.main" minHeight="100vh">
                {children}
            </Box>
        </ThemeProvider>
    )
}

export default ThemeWrapper