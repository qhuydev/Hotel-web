import mongoose from 'mongoose'

const messageLogSchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: String,
  body: String,
  template: { type: mongoose.Schema.Types.ObjectId, ref: 'MessageTemplate' },
  trigger: String,
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
  error: String,
  meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true })

export default mongoose.model('MessageLog', messageLogSchema)
