import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: String, required: true },
    roomTitle: { type: String, required: true },
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    price: { type: Number, required: true },
    // booking status: pending | confirmed | cancelled
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
