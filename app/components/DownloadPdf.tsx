"use client"

import { Button, Modal, Stack, Typography } from "@mui/material"
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
                            paddingLeft: 128,
                            paddingRight: 128,
                            paddingTop: 64,
                            paddingBottom: 64,
                            display: "flex"
                        }
                    }
                }}
            >
                <Stack
                    sx={{
                        p: 4,
                        bgcolor: "bgcolor.secondary",
                        width: "100%",
                        borderRadius: 1
                    }}
                    alignItems="start"
                >
                    <Typography variant="h1" mb={3}>Preview</Typography>

                    <PdfPreview order={order} />

                    <Stack direction={"row"} gap={3} width="35rem">
                        <Button fullWidth size="large" variant="contained" startIcon={<FileDownloadOutlinedIcon />} color="accent" onClick={() => createPdf()}>Download</Button>
                        <Button onClick={() => setIsOpen(false)} fullWidth size="large" variant="outlined" color="accent">Cancel</Button>
                    </Stack>
                </Stack>
            </Modal>
        </>
    )
}

export default DownloadPdf