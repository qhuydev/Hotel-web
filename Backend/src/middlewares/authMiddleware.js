import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' })

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    const user = await User.findById(decoded.userId)
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'User not found' })
    }

    // Map legacy `isPremium` to `isAdmin` for runtime checks
    if ((typeof user.isAdmin === 'undefined' || user.isAdmin === null) && typeof user.isPremium !== 'undefined') {
      user.isAdmin = !!user.isPremium
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
