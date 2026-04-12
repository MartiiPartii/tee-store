"use client"

import { Upload, X } from "lucide-react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Cropper, { Area, Point } from "react-easy-crop"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getCroppedImageBlob } from "@/lib/getCroppedImageBlob"

const MAX_BYTES = 10 * 1024 * 1024

function extForMime(mime: string): string {
  if (mime === "image/png") return "png"
  if (mime === "image/webp") return "webp"
  return "jpg"
}

const ImageInput = ({
  file,
  setFile,
}: {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [fileEnter, setFileEnter] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [cropOpen, setCropOpen] = useState(false)
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)
  const [pendingName, setPendingName] = useState("")
  const [pendingMime, setPendingMime] = useState("image/jpeg")
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isCropping, setIsCropping] = useState(false)

  const sourceRef = useRef<string | null>(null)

  const replaceSource = useCallback((next: string | null) => {
    if (sourceRef.current) URL.revokeObjectURL(sourceRef.current)
    sourceRef.current = next
    setSourceUrl(next)
  }, [])

  useEffect(() => {
    return () => {
      if (sourceRef.current) URL.revokeObjectURL(sourceRef.current)
      sourceRef.current = null
    }
  }, [])

  const openCropDialog = useCallback(
    (fileObj: File) => {
      setError(null)
      replaceSource(URL.createObjectURL(fileObj))
      setPendingName(fileObj.name || "shirt-image")
      setPendingMime(fileObj.type && fileObj.type.startsWith("image/") ? fileObj.type : "image/jpeg")
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
      setCropOpen(true)
    },
    [replaceSource]
  )

  const closeCropDialog = useCallback(() => {
    replaceSource(null)
    setCroppedAreaPixels(null)
    setCropOpen(false)
  }, [replaceSource])

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const files = e.target.files
    if (files?.[0]) {
      const fileObj = files[0]
      if (fileObj.size > MAX_BYTES) setError("Maximum file size is 10MB.")
      else openCropDialog(fileObj)
    }
    e.target.value = ""
  }

  const handleDropFile = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setFileEnter(false)
    setError(null)
    if (e.dataTransfer.items) {
      if ([...e.dataTransfer.items].length > 1) {
        setError("You can only upload one file.")
      } else {
        ;[...e.dataTransfer.items].forEach((item) => {
          if (item.kind === "file") {
            const fileObj = item.getAsFile()
            if (fileObj) {
              if (fileObj.size > MAX_BYTES) setError("Maximum file size is 10MB.")
              else openCropDialog(fileObj)
            }
          }
        })
      }
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    setImageUrl(null)
  }

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  const handleApplyCrop = async () => {
    if (!sourceUrl || !croppedAreaPixels) return
    setIsCropping(true)
    setError(null)
    try {
      const mime =
        pendingMime === "image/png" || pendingMime === "image/webp"
          ? pendingMime
          : "image/jpeg"
      const blob = await getCroppedImageBlob(sourceUrl, croppedAreaPixels, mime)
      const base = pendingName.replace(/\.[^/.]+$/, "") || "shirt-image"
      const ext = extForMime(blob.type || mime)
      const outName = `${base}.${ext}`
      const croppedFile = new File([blob], outName, {
        type: blob.type || mime,
      })
      setFile(croppedFile)
      closeCropDialog()
    } catch {
      setError("Could not crop this image. Try a different file or format.")
      closeCropDialog()
    } finally {
      setIsCropping(false)
    }
  }

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setImageUrl(null)
  }, [file])

  return (
    <div className="flex flex-col gap-2">
      <Dialog
        open={cropOpen}
        onOpenChange={(open) => {
          if (!open) closeCropDialog()
        }}
      >
        <DialogContent
          className="max-h-[min(90vh,720px)] max-w-[min(calc(100vw-2rem),480px)] gap-4 overflow-y-auto border-border bg-background p-5 sm:p-6"
          showCloseButton={!isCropping}
          onPointerDownOutside={(e) => {
            if (isCropping) e.preventDefault()
          }}
          onEscapeKeyDown={(e) => {
            if (isCropping) e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-primary">Crop to square</DialogTitle>
            <DialogDescription>
              Drag to reposition. Use the slider to zoom. The result is always a
              square, matching your listing preview.
            </DialogDescription>
          </DialogHeader>

          {sourceUrl ? (
            <div className="space-y-4">
              <div className="relative mx-auto aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl bg-brand-surface">
                <Cropper
                  image={sourceUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  showGrid={true}
                  style={{
                    containerStyle: {
                      width: "100%",
                      height: "100%",
                    },
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-zoom" className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                  Zoom
                </Label>
                <input
                  id="crop-zoom"
                  type="range"
                  min={1}
                  max={3}
                  step={0.02}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-surface accent-primary"
                />
              </div>
            </div>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outlinePrimary"
              disabled={isCropping}
              onClick={() => closeCropDialog()}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              disabled={!croppedAreaPixels || isCropping}
              onClick={() => void handleApplyCrop()}
            >
              {isCropping ? "Saving…" : "Use cropped image"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {imageUrl ? (
        <div className="relative mt-2 flex justify-center">
          <Image
            src={imageUrl}
            alt="Your Image"
            width={500}
            height={500}
            className="aspect-square w-full max-w-[500px] rounded-2xl object-cover"
          />
          <button
            type="button"
            className="absolute -right-2 -top-2 flex size-10 items-center justify-center rounded-full border border-border bg-brand-surface text-primary shadow-soft sm:-right-5 sm:-top-5"
            onClick={handleRemoveImage}
            aria-label="Remove image"
          >
            <X className="size-6" />
          </button>
        </div>
      ) : (
        <>
          <Label htmlFor="shirt-pic">T-Shirt Image*</Label>

          <label
            htmlFor="shirt-pic"
            className={cn(
              "mt-1 flex cursor-pointer flex-col items-center rounded-2xl border border-dashed border-border bg-brand-bg/50 p-8 transition-colors",
              fileEnter && "border-primary bg-primary/[0.04]",
              error && "border-destructive/60 bg-destructive/[0.03]"
            )}
            onDragOver={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault()
              if (!fileEnter) setFileEnter(true)
            }}
            onDragLeave={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault()
              if (fileEnter) setFileEnter(false)
            }}
            onDragEnd={(e: React.DragEvent<HTMLLabelElement>) => {
              e.preventDefault()
              if (fileEnter) setFileEnter(false)
            }}
            onDrop={(e) => handleDropFile(e)}
          >
            <Upload className="mb-4 size-12 text-brand-muted" aria-hidden />

            {fileEnter ? (
              <p className="text-base text-brand-muted">Drop your files here...</p>
            ) : (
              <>
                <p className="mb-2 text-base text-brand-muted">
                  <span className="text-foreground">Click to upload</span> or drag and drop
                </p>
                <p className="text-sm text-brand-muted">Images up to 10MB</p>
              </>
            )}

            <input
              type="file"
              onChange={(e) => handleUploadFile(e)}
              accept="image/*"
              id="shirt-pic"
              hidden
            />
          </label>
        </>
      )}

      {error ? (
        <p
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default ImageInput
