import { Container, ContainerProps } from "@mui/material"
import React from "react"

const SectionContainer = ({ children, props } : { children: React.ReactNode, props?: ContainerProps }) => {
    return (
        <Container maxWidth="xl" {...props}>
            {children}
        </Container>
    )
}

export default SectionContainer