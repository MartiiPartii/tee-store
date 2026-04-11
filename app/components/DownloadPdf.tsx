"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { FileDown } from "lucide-react"
import { useState } from "react"
import { OrderDetailsInterface } from "@/types/order"
import PdfPreview from "./PdfPreview"
import { Button } from "@/components/ui/button"
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog"

const DownloadPdf = ({ order }: { order: OrderDetailsInterface }) => {
  const [isOpen, setIsOpen] = useState(false)

  const createPdf = async () => {
    const element = document.getElementById("preview") || undefined
    if (!element) return

    const html2pdf = (await import("html2pdf.js")).default
    html2pdf(element, {
      filename: `teestore_order_${order.id}.pdf`,
    })
  }

  return (
    <>
      <Button variant="default" type="button" onClick={() => setIsOpen(true)}>
        <FileDown className="size-4" />
        Get as PDF
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Content
            className="fixed inset-0 z-50 flex w-full flex-col overflow-y-auto border-0 bg-transparent p-0 shadow-none outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{ width: "100%", display: "flex" }}
          >
            <div className="w-full px-2 py-16 sm:px-4 md:px-8 lg:px-16">
              <div className="flex w-full flex-col items-start rounded-2xl border border-border bg-brand-surface p-4 sm:p-6">
                <p className="ui-section-label mb-2">Export</p>
                <h1 className="ui-page-title mb-6">Preview</h1>

                <PdfPreview order={order} />

                <div className="flex w-full max-w-[35rem] flex-col gap-6 sm:flex-row">
                  <Button
                    className="flex-1"
                    variant="default"
                    size="lg"
                    type="button"
                    onClick={() => createPdf()}
                  >
                    <FileDown className="size-4" />
                    Download
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outlinePrimary"
                    size="lg"
                    type="button"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default DownloadPdf
