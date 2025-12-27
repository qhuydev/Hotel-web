import nodemailer from 'nodemailer'
import MessageTemplate from '../models/MessageTemplate.js'
import MessageLog from '../models/MessageLog.js'

let transporterPromise = null
async function getTransporter() {
  if (transporterPromise) return transporterPromise

  transporterPromise = (async () => {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    }

    // Fallback to Ethereal for testing
    const testAccount = await nodemailer.createTestAccount()
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
  })()

  return transporterPromise
}

function renderTemplateString(template, data = {}) {
  // Replace {{path}} with values from data, supports dot paths
  return template.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => {
    const parts = key.split('.')
    let cur = data
    for (const p of parts) {
      if (cur == null) return ''
      cur = cur[p]
    }
    return (cur == null) ? '' : String(cur)
  })
}

export async function sendRawEmail({ to, subject, html, text }) {
  const transporter = await getTransporter()
  const from = process.env.EMAIL_FROM || `no-reply@${process.env.PROJECT_DOMAIN || 'localhost'}`

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text: text || undefined,
    html: html || undefined,
  })

  // If ethereal, print preview URL
  const preview = nodemailer.getTestMessageUrl(info)
  if (preview) {
    console.info('Message preview URL:', preview)
  }

  return { info, preview }
}

export async function sendTemplate(trigger, to, data = {}, opts = {}) {
  const template = await MessageTemplate.findOne({ trigger, enabled: true })
  if (!template) return { skipped: true }

  const subject = renderTemplateString(template.subject, data)
  const body = renderTemplateString(template.body, data)

  const log = new MessageLog({
    to,
    subject,
    body,
    template: template._id,
    trigger,
    booking: data.booking?._id,
  })

  try {
    const { preview } = await sendRawEmail({ to, subject, html: body })
    log.status = 'sent'
    log.meta = { preview }
    await log.save()
    return { sent: true, preview }
  } catch (err) {
    log.status = 'failed'
    log.error = err.message
    await log.save()
    throw err
  }
}

export async function ensureDefaultTemplates() {
  const defaults = [
    {
      trigger: 'booking_created',
      name: 'Booking received (auto-reply)',
      subject: 'Booking received — {{booking._id}}',
      body: `Hello {{booking.guestName}},<br/><br/>
      Thank you for your booking for <strong>{{booking.roomTitle}}</strong>.<br/>
      Booking ID: <strong>{{booking._id}}</strong><br/>
      Check-in: {{booking.checkIn}}<br/>
      Check-out: {{booking.checkOut}}<br/><br/>
      We will review and confirm your booking shortly.<br/><br/>
      Best regards,<br/>Hotel Team`,
      enabled: true,
    },
    {
      trigger: 'booking_confirmed',
      name: 'Booking confirmed (auto-reply)',
      subject: 'Booking confirmed — {{booking._id}}',
      body: `Hello {{booking.guestName}},<br/><br/>
      Your booking for <strong>{{booking.roomTitle}}</strong> has been <strong>confirmed</strong>.<br/>
      Booking ID: <strong>{{booking._id}}</strong><br/>
      Check-in: {{booking.checkIn}}<br/>
      Check-out: {{booking.checkOut}}<br/><br/>
      We look forward to welcoming you.<br/><br/>
      Best regards,<br/>Hotel Team`,
      enabled: true,
    }
  ]
  for (const d of defaults) {
    const exists = await MessageTemplate.findOne({ trigger: d.trigger })
    if (!exists) {
      await MessageTemplate.create(d)
      console.info('Default template created:', d.trigger)
    }
  }
}

export { renderTemplateString }
