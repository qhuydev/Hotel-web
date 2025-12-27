import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  type: { type: String, enum: ['TEXT', 'CARD'], default: 'TEXT' },
  card: mongoose.Schema.Types.Mixed,
  isRead: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Message', messageSchema)
