import MessageTemplate from '../models/MessageTemplate.js'
import MessageLog from '../models/MessageLog.js'
import Message from '../models/Message.js'
import User from '../models/User.js'
import { success } from '../utils/apiResponse.js'
import { sendRawEmail } from '../services/messageService.js'
export const listTemplates = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const templates = await MessageTemplate.find().sort({ createdAt: -1 })
  res.json(success('Templates', templates))
}

export const createTemplate = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { name, trigger, subject, body, enabled } = req.body
  if (!name || !trigger || !subject || !body) return res.status(400).json({ success: false, message: 'Missing fields' })
  const t = await MessageTemplate.create({ name, trigger, subject, body, enabled })
  res.json(success('Template created', t))
}

export const updateTemplate = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { id } = req.params
  const t = await MessageTemplate.findByIdAndUpdate(id, req.body, { new: true })
  if (!t) return res.status(404).json({ success: false, message: 'Template not found' })
  res.json(success('Template updated', t))
}

export const deleteTemplate = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const { id } = req.params
  const t = await MessageTemplate.findByIdAndDelete(id)
  if (!t) return res.status(404).json({ success: false, message: 'Template not found' })
  res.json(success('Template deleted', t))
}

export const listLogs = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Number(req.query.limit) || 50)
  const q = MessageLog.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate('template', 'name trigger')
  const [items, count] = await Promise.all([q.exec(), MessageLog.countDocuments()])
  res.json(success('Logs', { items, count, page, limit }))
}

export const listMyLogs = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Number(req.query.limit) || 50)
  const filter = { to: req.user.email }
  if (req.query.bookingId) filter.booking = req.query.bookingId
  const q = MessageLog.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate('template', 'name trigger')
  const [items, count] = await Promise.all([q.exec(), MessageLog.countDocuments(filter)])
  res.json(success('My messages', { items, count, page, limit }))
}

export const getConversation = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })
  const { otherUserId } = req.params
  const userId = req.user._id
  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: userId }
    ]
  }).sort({ createdAt: 1 }).populate('senderId', 'displayName email').populate('receiverId', 'displayName email')

  res.json(success('Conversation', messages))
}

export const markConversationRead = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })
  const { otherUserId } = req.params
  const userId = req.user._id
  await Message.updateMany({ senderId: otherUserId, receiverId: userId, isRead: false }, { isRead: true })
  res.json(success('Marked read'))
}

export const deleteMessage = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })
  const { id } = req.params
  const message = await Message.findById(id)
  if (!message) return res.status(404).json({ success: false, message: 'Message not found' })
  // only sender can delete
  if (String(message.senderId) !== String(req.user._id)) return res.status(403).json({ success: false, message: 'Forbidden' })
  await message.remove()
  res.json(success('Deleted'))
}

export const getAdmin = async (req, res) => {
  const admin = await User.findOne({ isAdmin: true }).select('displayName email')
  if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' })
  res.json(success('Admin', admin))
}

export const getConversationsForAdmin = async (req, res) => {
  if (!req.user?.isAdmin) return res.status(403).json({ success: false, message: 'Forbidden' })
  const adminId = req.user._id

  // Aggregate messages grouped by the other user
  const pipeline = [
    { $match: { $or: [{ senderId: adminId }, { receiverId: adminId }] } },
    { $sort: { createdAt: 1 } },
    { $project: {
      otherId: { $cond: [{ $eq: ['$senderId', adminId] }, '$receiverId', '$senderId'] },
      senderId: 1,
      receiverId: 1,
      content: 1,
      createdAt: 1,
      isRead: 1,
      type: 1
    }},
    { $group: {
      _id: '$otherId',
      lastMessage: { $last: '$$ROOT' },
      unreadCount: { $sum: { $cond: [{ $and: [{ $eq: ['$receiverId', adminId] }, { $eq: ['$isRead', false] }] }, 1, 0] } }
    }},
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    { $project: {
      user: { _id: '$user._id', displayName: '$user.displayName', email: '$user.email' },
      lastMessage: 1,
      unreadCount: 1
    }},
    { $sort: { 'lastMessage.createdAt': -1 } }
  ]

  const convs = await Message.aggregate(pipeline)
  res.json(success('Conversations', convs))
}

export const sendMessage = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })
  const { receiverId, content, messageType, card } = req.body
  if (!content) return res.status(400).json({ success: false, message: 'Message content is required' })

  // If receiverId not provided, fallback to admin as receiver
  let receiver = null
  if (receiverId) receiver = await User.findById(receiverId)
  if (!receiver) {
    receiver = await User.findOne({ isAdmin: true })
  }
  if (!receiver) return res.status(400).json({ success: false, message: 'No receiver found' })

  const message = await Message.create({
    senderId: req.user._id,
    receiverId: receiver._id,
    content,
    type: messageType || 'TEXT',
    card: card || null,
  })

  // also create a MessageLog for audit/notifications
  const log = await MessageLog.create({
    to: receiver.email || process.env.ADMIN_EMAIL || 'admin@example.com',
    subject: `Message from ${req.user.email}`,
    body: content,
    trigger: 'user_message',
    status: 'sent',
    meta: { from: req.user.email, userId: req.user._id, messageId: message._id }
  })

  // Notify receiver by email (best-effort)
  try {
    await sendRawEmail({ to: receiver.email, subject: log.subject, text: `${req.user.email}:\n\n${content}` })
  } catch (err) {
    console.error('Failed to notify receiver about message:', err.message)
  }

  await message.populate('senderId', 'displayName email')
  res.status(201).json(success('Message sent', message))
}
