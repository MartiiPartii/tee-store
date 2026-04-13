/** TeeStore brand tokens (inline for email clients). */
const colors = {
  bg: "#f6f4f0",
  surface: "#faf9f7",
  text: "#2c2825",
  muted: "#5c5650",
  border: "#d9d2c9",
  primary: "#2c2825",
  onPrimary: "#f6f4f0",
} as const

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export const VERIFICATION_EMAIL_SUBJECT = "Confirm your TeeStore account"

export type VerificationEmailParams = {
  firstName: string
  verificationUrl: string
}

/**
 * HTML + plain-text bodies for the account verification message.
 * Keeps primary CTA link and includes a copy-paste fallback URL.
 */
export function buildVerificationEmail({
  firstName,
  verificationUrl,
}: VerificationEmailParams): { html: string; text: string } {
  const safeName = escapeHtml(firstName.trim() || "there")
  const safeUrl = escapeHtml(verificationUrl)

  const text = `Hi ${firstName.trim() || "there"},

Thanks for creating a TeeStore account. Confirm your email to finish signing up and start browsing.

Open this link in your browser:
${verificationUrl}

If the link doesn't work, copy the entire line above and paste it into your browser's address bar.

This link expires in 15 minutes for your security.

— TeeStore
`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${VERIFICATION_EMAIL_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:${colors.bg};font-family:system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${colors.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;background-color:${colors.surface};border:1px solid ${colors.border};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(44,40,37,0.06);">
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${colors.muted};">TeeStore</p>
              <h1 style="margin:12px 0 0 0;font-size:22px;font-weight:700;line-height:1.25;color:${colors.text};letter-spacing:-0.02em;">Confirm your email</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 24px 28px;">
              <p style="margin:0;font-size:15px;line-height:1.55;color:${colors.text};">Hi ${safeName},</p>
              <p style="margin:16px 0 0 0;font-size:15px;line-height:1.55;color:${colors.muted};">You&rsquo;re one step away from the marketplace. Use the button below to verify your address and activate your account.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;" align="center">
              <a href="${safeUrl}" style="display:inline-block;padding:12px 28px;background-color:${colors.primary};color:${colors.onPrimary};font-size:14px;font-weight:600;text-decoration:none;border-radius:9999px;letter-spacing:0.02em;">Verify my email</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;border-top:1px solid ${colors.border};">
              <p style="margin:24px 0 8px 0;font-size:13px;line-height:1.5;color:${colors.muted};">If the button doesn&rsquo;t work, copy the link below and paste it into your browser:</p>
              <p style="margin:0;padding:12px 14px;background-color:${colors.bg};border:1px solid ${colors.border};border-radius:10px;font-size:12px;line-height:1.45;word-break:break-all;color:${colors.text};font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">${safeUrl}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:${colors.muted};">This link expires in <strong style="color:${colors.text};font-weight:600;">15 minutes</strong>. If you didn&rsquo;t create an account, you can ignore this message.</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0 0;max-width:520px;font-size:11px;line-height:1.5;color:${colors.muted};text-align:center;">A calm marketplace for unique tees &mdash; studio picks and designs from independent sellers.</p>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { html, text }
}
