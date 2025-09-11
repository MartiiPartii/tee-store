import crypto from "crypto"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_SECRET!
})

const generateSignature = (timestamp: string, uploadPreset: string) => {
    const signatureString = `timestamp=${timestamp}&upload_preset=${uploadPreset}${process.env.CLOUDINARY_SECRET!}`
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex")
    console.log(`Signature: ${signature}`)
    return signature
}

export const uploadToCloudinary = async (file: FormDataEntryValue) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "TeeStore")

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME!}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    )
    
    return response

}