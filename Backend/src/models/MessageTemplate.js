import mongoose from 'mongoose'

const messageTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trigger: { type: String, required: true, unique: true }, // e.g. booking_created
  subject: { type: String, required: true },
  body: { type: String, required: true }, // HTML or text with placeholders like {{guestName}}
  enabled: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('MessageTemplate', messageTemplateSchema)
