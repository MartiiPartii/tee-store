import { Base64 } from "js-base64"

export function generateUidb(userId: number) {
    const byteArray = new TextEncoder().encode(userId.toString())
    const uidb = Base64.fromUint8Array(byteArray, true)
    return uidb
}

export function decodeUidb(uidb: string) {
    const byteArray = Base64.toUint8Array(uidb)
    const decoded = new TextDecoder().decode(byteArray)
    return decoded
}