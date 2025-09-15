"use client"

import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useState } from "react";
import { OrderDetailsInterface } from "@/types/order";
import PdfPreview from "./PdfPreview";

const DownloadPdf = ({ order }: { order: OrderDetailsInterface }) => {
    const [isOpen, setIsOpen] = useState(false)

    const createPdf = async () => {
        const element = document.getElementById("preview") || undefined
        if(!element) return

        const html2pdf = (await import('html2pdf.js')).default
        html2pdf(element, {
            filename: `teestore_order_${order.id}.pdf`
        })

        console.log("ehy")
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="contained" startIcon={<FileDownloadOutlinedIcon />} color="accent">Get as PDF</Button>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                slotProps={{
                    root: {
                        style: {
                            width: "100%",
                            display: "flex"
                        }
                    }
                }}
            >
                <Box sx={{
                    width: "100%",
                    px: { xs: 2, sm: 4, md: 8, lg: 16 },
                    py: 8,
                    overflow: "auto"
                }}>
                    <Stack
                        sx={{
                            p: { xs: 2, sm: 4 },
                            bgcolor: "bgcolor.secondary",
                            width: "100%",
                            borderRadius: 1
                        }}
                        alignItems="start"
                    >
                        <Typography variant="h1" mb={3}>Preview</Typography>

                        <PdfPreview order={order} />

                        <Stack direction={{ sm: "row" }} gap={3} width={"100%"} maxWidth="35rem">
                            <Button sx={{ flex: 1 }} fullWidth size="large" variant="contained" startIcon={<FileDownloadOutlinedIcon />} color="accent" onClick={() => createPdf()}>Download</Button>
                            <Button sx={{ flex: 1 }} onClick={() => setIsOpen(false)} fullWidth size="large" variant="outlined" color="accent">Cancel</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default DownloadPdf