import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const TO = process.env.BOOKING_EMAIL_TO ?? 'reservations@rumbatoursmiami.com'

export async function POST(request: Request) {
  let data: { name?: string; email?: string; phone?: string; subject?: string; message?: string }

  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!data.email || !data.name || !data.message) {
    return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
  }

  const subject = data.subject
    ? `Contact: ${data.subject} — ${data.name}`
    : `New message from ${data.name}`

  const internalHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#1a1a1a;padding:20px 28px">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Miami White Trolley</p>
            <p style="margin:6px 0 0;color:#ccc;font-size:15px">New contact message — ${data.name}</p>
          </td>
        </tr>
        <tr><td style="padding:24px 28px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e8e8e8;margin-bottom:20px">
            <tr>
              <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444;width:120px">Name</td>
              <td style="padding:8px 12px;color:#222">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444">Email</td>
              <td style="padding:8px 12px;color:#222"><a href="mailto:${data.email}" style="color:#1a1a1a">${data.email}</a></td>
            </tr>
            ${data.phone ? `<tr>
              <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444">Phone</td>
              <td style="padding:8px 12px;color:#222">${data.phone}</td>
            </tr>` : ''}
            ${data.subject ? `<tr>
              <td style="padding:8px 12px;background:#f7f7f7;font-weight:600;color:#444">Subject</td>
              <td style="padding:8px 12px;color:#222">${data.subject}</td>
            </tr>` : ''}
          </table>
          <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Message</p>
          <div style="background:#f7f7f7;border-radius:8px;padding:14px 16px;color:#333;font-size:14px;line-height:1.7;white-space:pre-wrap">${data.message}</div>
        </td></tr>
        <tr>
          <td style="background:#f7f7f7;padding:16px 28px;text-align:center">
            <p style="margin:0;font-size:12px;color:#999">Submitted via miamiwhitetrolley.com/contact · Reply directly to this email</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const confirmationHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:600px;width:100%">
        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;text-align:center">
            <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase">Miami White Trolley</p>
            <p style="margin:8px 0 0;color:#ccc;font-size:20px;font-weight:300">We got your message</p>
          </td>
        </tr>
        <tr><td style="padding:32px">
          <p style="margin:0 0 16px;font-size:16px;color:#222">Hi ${data.name},</p>
          <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.7">
            Thanks for reaching out. We&apos;ll review your message and get back to you within a few hours.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;border-radius:10px">
            <tr><td style="padding:20px 24px">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase">Need us sooner?</p>
              <p style="margin:0 0 8px;font-size:14px;color:#333">
                <span style="font-weight:600">Phone:</span>
                <a href="tel:+17865651088" style="color:#1a1a1a;text-decoration:none">&nbsp;(786) 565-1088</a>
              </p>
              <p style="margin:0;font-size:14px;color:#333">
                <span style="font-weight:600">WhatsApp:</span>
                <a href="https://wa.me/17548005079" style="color:#25d366;text-decoration:none;font-weight:600">&nbsp;Message us on WhatsApp</a>
              </p>
            </td></tr>
          </table>
        </td></tr>
        <tr>
          <td style="background:#f7f7f7;padding:16px 32px;text-align:center;border-top:1px solid #e8e8e8">
            <p style="margin:0;font-size:12px;color:#999">Miami White Trolley · miamiwhitetrolley.com</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  try {
    await Promise.all([
      transporter.sendMail({
        from: `"Miami White Trolley" <${process.env.GMAIL_USER}>`,
        to: TO,
        replyTo: data.email,
        subject,
        html: internalHtml,
      }),
      transporter.sendMail({
        from: `"Miami White Trolley" <${process.env.GMAIL_USER}>`,
        to: data.email,
        subject: 'We received your message — Miami White Trolley',
        html: confirmationHtml,
      }),
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] email send failed', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
