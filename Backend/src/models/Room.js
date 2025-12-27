import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    roomType: { type: String },
    adults: { type: Number, default: 2 },
    children: { type: Number, default: 0 },
    amenities: { type: [String], default: [] },
    // images available to everyone
    images: { type: [String], default: [] },
    // premium images / info visible only to premium users
    premiumImages: { type: [String], default: [] },
    premiumInfo: { type: String, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Room', RoomSchema)