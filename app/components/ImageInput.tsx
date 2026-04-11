"use client"

import { Upload, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
          console.log(item)
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
    <div>
      {imageUrl ? (
        <div className="relative mt-6 flex justify-center">
          <Image
            src={imageUrl}
            alt="Your Image"
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "0.75rem",
            }}
          />
          <button
            type="button"
            className="absolute -right-5 -top-5 flex size-10 items-center justify-center rounded-full border border-border bg-brand-surface text-primary shadow-soft"
            onClick={handleRemoveImage}
            aria-label="Remove image"
          >
            <X className="size-6" />
          </button>
        </div>
      ) : (
        <>
          <label
            htmlFor="shirt-pic"
            className="text-sm font-medium text-brand-muted"
          >
            T-Shirt Image*
          </label>

          <label
            htmlFor="shirt-pic"
            className={cn(
              "mt-2 mb-2 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed p-6",
              fileEnter
                ? "border-primary"
                : error
                  ? "border-destructive"
                  : "border-[var(--brand-border)]"
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
              console.log("drag end")
            }}
            onDrop={(e) => handleDropFile(e)}
          >
            <Upload className="mb-4 size-12 text-brand-muted" aria-hidden />

            {fileEnter ? (
              <p className="text-base text-brand-muted">Drop your files here...</p>
            ) : (
              <>
                <p className="mb-2 text-base text-brand-muted">
                  <span className="text-brand-text">Click to upload</span> or drag
                  and drop
                </p>
                <p className="mb-2 text-sm text-brand-muted">Images up to 10MB</p>
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

      {error && (
        <p className="text-sm italic text-destructive">{error}</p>
      )}
    </div>
  )
}

export default ImageInput
