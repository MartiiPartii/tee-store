import { Container } from "@mui/material"
import React from "react"

const SectionContainer = ({ children } : { children: React.ReactNode }) => {
    return (
        <Container maxWidth="xl">
            {children}
        </Container>
    )
}

export default SectionContainer