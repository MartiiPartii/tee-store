"use client"

import { Upload, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const ImageInput = ({
  file,
  setFile,
}: {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [fileEnter, setFileEnter] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files) {
      const fileObj = e.target.files[0]
      if (fileObj && fileObj?.size > 10 * 1024 * 1024)
        setError("Maximum file size is 10MB.")
      else setFile(fileObj)
    }
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
            if (fileObj && fileObj?.size > 10 * 1024 * 1024)
              setError("Maximum file size is 10MB.")
            else setFile(item.getAsFile())
          }
        })
      }
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    setImageUrl(null)
  }

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }, [file])

  return (
    <div className="flex flex-col gap-2">
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
