import Booking from '../models/Booking.js'
import { success } from '../utils/apiResponse.js'
import { sendTemplate } from '../services/messageService.js'
import Message from '../models/Message.js'
import User from '../models/User.js'

export const createBooking = async (req, res) => {
  const { roomId, roomTitle, guestName, email, checkIn, checkOut, price } = req.body
  if (!roomId || !guestName || !email || !checkIn || !checkOut || !price) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  const booking = await Booking.create({
    user: req.user._id,
    roomId,
    roomTitle,
    guestName,
    email,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    price,
  })

  // populate user info for response
  await booking.populate('user', 'displayName email')

  // send auto-reply (non-blocking)
  sendTemplate('booking_created', booking.email, { booking })
    .catch(err => console.error('Auto-reply failed (booking_created):', err.message))



  res.json(success('Booking created', booking))
}

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(success('My bookings', bookings))
}

export const getAllBookings = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const bookings = await Booking.find().sort({ createdAt: -1 }).populate('user', 'displayName email')
  res.json(success('All bookings', bookings))
}

export const confirmBooking = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { id } = req.params
  const booking = await Booking.findByIdAndUpdate(id, { status: 'confirmed' }, { new: true }).populate('user', 'displayName email')
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })

  // send auto-reply (non-blocking)
  sendTemplate('booking_confirmed', booking.email, { booking })
    .catch(err => console.error('Auto-reply failed (booking_confirmed):', err.message))

  // conversation message: admin -> user (confirmed)
  let confirmMessage = null
  try {
    const admin = await User.findOne({ isAdmin: true })
    if (admin) {
      confirmMessage = await Message.create({
        senderId: admin._id,
        receiverId: booking.user._id || booking.user,
        content: `Your booking ${booking._id} has been confirmed.`,
        type: 'TEXT'
      })
      // populate sender details
      confirmMessage = await Message.findById(confirmMessage._id).populate('senderId', 'displayName email')
    }
  } catch (err) {
    console.error('Failed to create conversation message for booking confirmation:', err.message)
  }

  // return booking and created message (if any)
  res.json(success('Booking confirmed', { booking, message: confirmMessage }))
}

export const getBookingCounts = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  // aggregate counts per roomId
  const counts = await Booking.aggregate([
    { $group: { _id: '$roomId', count: { $sum: 1 } } }
  ])
  const map = counts.reduce((acc, c) => { acc[c._id] = c.count; return acc }, {})
  res.json(success('Booking counts', map))
}

export const deleteBooking = async (req, res) => {
  // only admin can delete bookings via admin panel
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { id } = req.params
  const booking = await Booking.findByIdAndDelete(id)
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' })
  res.json(success('Booking deleted', booking))
}
