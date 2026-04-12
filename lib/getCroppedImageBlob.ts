import type { Area } from "react-easy-crop"

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image"))
    img.src = src
  })
}

/**
 * Renders the given region of `imageSrc` (object URL or data URL) to a canvas
 * and returns a Blob. `pixelCrop` must be `croppedAreaPixels` from react-easy-crop.
 */
export async function getCroppedImageBlob(
  imageSrc: string,
  pixelCrop: Area,
  mimeType: string,
  quality = 0.92
): Promise<Blob> {
  const image = await loadImage(imageSrc)
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(pixelCrop.width)
  canvas.height = Math.round(pixelCrop.height)
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Could not get canvas context")

  ctx.drawImage(
    image,
    Math.round(pixelCrop.x),
    Math.round(pixelCrop.y),
    Math.round(pixelCrop.width),
    Math.round(pixelCrop.height),
    0,
    0,
    canvas.width,
    canvas.height
  )

  const type =
    mimeType === "image/png" || mimeType === "image/webp" ? mimeType : "image/jpeg"

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error("Failed to export image"))
      },
      type,
      type === "image/jpeg" ? quality : undefined
    )
  })
}
