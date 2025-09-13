"use client"
import theme from "@/theme/theme"
import { ThemeProvider } from "@mui/material/styles"
import { Box } from "@mui/material"
import React from "react"

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor="bgcolor.main">
                {children}
            </Box>
        </ThemeProvider>
    )
}

export default ThemeWrapper