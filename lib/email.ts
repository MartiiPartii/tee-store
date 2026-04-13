import nodemailer from "nodemailer"

const portRaw = Number(process.env.SMTP_PORT)
const port =
  Number.isFinite(portRaw) && portRaw > 0 ? portRaw : 587

/** Port 465 = implicit TLS (SMTPS). 587 / others = plain connect, then STARTTLS. */
const secure = port === 465

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  ...(!secure && { requireTLS: true }),
})

/** `From` address for outgoing mail (must be allowed by your SMTP provider). */
export function smtpFrom(): string {
  const v = process.env.SMTP_FROM?.trim()
  if (!v) {
    throw new Error("[email] SMTP_FROM is not set in environment variables")
  }
  return v
}
