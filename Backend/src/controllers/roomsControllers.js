import Room from '../models/Room.js'
import Booking from '../models/Booking.js'
import { success } from '../utils/apiResponse.js'

export const createRoom = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })

  console.info('createRoom: files=', req.files)
  console.info('createRoom: body=', req.body)

  // parse fields (works for both JSON and multipart/form-data)
  const { title, description, price, roomType, adults, children, amenities, premiumInfo } = req.body
  if (!title || (typeof price === 'undefined')) return res.status(400).json({ success: false, message: 'Missing required fields' })

  // images can come from req.files (multer) or via JSON arrays in body
  const files = req.files || {}
  const imagesFromFiles = (files.images || []).map(f => `/uploads/${f.filename}`)
  const premiumFromFiles = (files.premiumImages || []).map(f => `/uploads/${f.filename}`)

  let imagesFromBody = []
  let premiumFromBody = []
  try {
    imagesFromBody = typeof req.body.images === 'string' ? JSON.parse(req.body.images || '[]') : (req.body.images || [])
  } catch (parseErr) {
    return res.status(400).json({ success: false, message: 'Invalid images JSON' })
  }
  try {
    premiumFromBody = typeof req.body.premiumImages === 'string' ? JSON.parse(req.body.premiumImages || '[]') : (req.body.premiumImages || [])
  } catch (parseErr) {
    return res.status(400).json({ success: false, message: 'Invalid premiumImages JSON' })
  }

  const images = [...imagesFromBody, ...imagesFromFiles]
  const premiumImages = [...premiumFromBody, ...premiumFromFiles]

  const room = await Room.create({ title, description, price: Number(price), roomType, adults: Number(adults || 2), children: Number(children || 0), amenities: Array.isArray(amenities) ? amenities : (typeof amenities === 'string' ? JSON.parse(amenities || '[]') : []), images, premiumImages, premiumInfo })
  res.json(success('Room created', room))
}

export const updateRoom = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { id } = req.params

  // handle multipart files similarly
  const files = req.files || {}
  const imagesFromFiles = (files.images || []).map(f => `/uploads/${f.filename}`)
  const premiumFromFiles = (files.premiumImages || []).map(f => `/uploads/${f.filename}`)

  // body may include existing arrays or strings
  const body = req.body || {}
  let imagesFromBody = []
  let premiumFromBody = []
  try {
    imagesFromBody = typeof body.images === 'string' ? JSON.parse(body.images || '[]') : (body.images || [])
  } catch (parseErr) {
    return res.status(400).json({ success: false, message: 'Invalid images JSON' })
  }
  try {
    premiumFromBody = typeof body.premiumImages === 'string' ? JSON.parse(body.premiumImages || '[]') : (body.premiumImages || [])
  } catch (parseErr) {
    return res.status(400).json({ success: false, message: 'Invalid premiumImages JSON' })
  }

  const images = [...imagesFromBody, ...imagesFromFiles]
  const premiumImages = [...premiumFromBody, ...premiumFromFiles]

  const updates = { ...body }
  if (images.length) updates.images = images
  if (premiumImages.length) updates.premiumImages = premiumImages
  if (typeof updates.price !== 'undefined') updates.price = Number(updates.price)

  const room = await Room.findByIdAndUpdate(id, updates, { new: true })
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' })
  res.json(success('Room updated', room))
}

export const deleteRoom = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { id } = req.params
  // prevent deletion if any bookings reference this room
  const existingBooking = await Booking.findOne({ roomId: id })
  if (existingBooking) return res.status(400).json({ success: false, message: 'Cannot delete room: existing bookings found' })

  const room = await Room.findByIdAndDelete(id)
  if (!room) return res.status(404).json({ success: false, message: 'Room not found' })
  res.json(success('Room deleted', room))
}
