"use client"

import { FileDown } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { OrderDetailsInterface } from "@/types/order"
import PdfPreview from "./PdfPreview"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const dialogContentClass =
  "fixed left-0 top-0 z-50 flex h-full max-h-full w-full max-w-full translate-x-0 translate-y-0 flex-col gap-0 overflow-y-auto rounded-none border-0 bg-transparent p-0 shadow-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"

const DownloadPdf = ({ order }: { order: OrderDetailsInterface }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const createPdf = useCallback(async () => {
    const element = previewRef.current
    if (!element) return

    setIsSaving(true)
    try {
      const html2pdf = (await import("html2pdf.js")).default
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: `teestore_order_${order.id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save()
    } catch (e) {
      console.error("PDF export failed:", e)
    } finally {
      setIsSaving(false)
    }
  }, [order.id])

  return (
    <>
      <Button
        ref={openButtonRef}
        variant="default"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <FileDown className="size-4" />
        Get as PDF
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            queueMicrotask(() => openButtonRef.current?.focus())
          }}
          className={cn(dialogContentClass)}
        >
          <DialogTitle className="sr-only">Export order as PDF</DialogTitle>
          <DialogDescription className="sr-only">
            Preview your order receipt, then download it as a PDF file.
          </DialogDescription>

          <div className="w-full px-2 py-16 sm:px-4 md:px-8 lg:px-16">
            <div className="flex w-full flex-col items-start rounded-2xl border border-border bg-brand-surface p-4 sm:p-6">
              <p className="ui-section-label mb-2">Export</p>
              <h2 className="ui-page-title mb-6">Preview</h2>

              <PdfPreview ref={previewRef} order={order} />

              <div className="flex w-full max-w-[35rem] flex-col gap-6 sm:flex-row">
                <Button
                  className="flex-1"
                  variant="default"
                  size="lg"
                  type="button"
                  disabled={isSaving}
                  onClick={() => void createPdf()}
                >
                  <FileDown className="size-4" />
                  {isSaving ? "Preparing…" : "Download"}
                </Button>
                <Button
                  className="flex-1"
                  variant="outlinePrimary"
                  size="lg"
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DownloadPdf
