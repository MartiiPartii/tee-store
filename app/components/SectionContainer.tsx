import { Container, ContainerProps } from "@mui/material"
import React from "react"

const SectionContainer = ({ children, props } : { children: React.ReactNode, props?: ContainerProps }) => {
    return (
        <Container maxWidth="lg" {...props}>
            {children}
        </Container>
    )
}

export default SectionContainer