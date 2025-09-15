import { Box, Button, Stack, Typography } from "@mui/material"
import { Metadata } from "next"
import SectionContainer from "./components/SectionContainer"
import Link from "next/link"

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function NotFound() {
  return (
    <SectionContainer props={{ sx: { py: 8 } }}>
        <Stack mx="auto" justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h3" mb={1}>Not Found</Typography>
            <Typography variant="body1" mb={2}>The page you are looking for was not found.</Typography>
            <Link href={'/'}><Button variant="contained" color="accent">Home</Button></Link>
        </Stack>
    </SectionContainer>
  )
}