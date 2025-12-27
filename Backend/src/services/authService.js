import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../utils/jwtUtil.js'

export const register = async ({ email, password, displayName }) => {
  const exists = await User.findOne({ email })
  if (exists) throw new Error('Email already exists')

  const hashedPassword = await bcrypt.hash(password, 10)

  const userDoc = await User.create({
    email,
    password: hashedPassword,
    displayName,
  })

  // Normalize user object and map legacy field
  const user = userDoc.toObject()
  if ((typeof user.isAdmin === 'undefined' || user.isAdmin === null) && typeof user.isPremium !== 'undefined') {
    user.isAdmin = !!user.isPremium
  }
  delete user.isPremium

  return {
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
    tokenType: 'Bearer',
    user,
  }
}

export const login = async ({ email, password }) => {
  const userDoc = await User.findOne({ email })
  if (!userDoc) throw new Error('Invalid credentials')

  const isMatch = await bcrypt.compare(password, userDoc.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const user = userDoc.toObject()
  if ((typeof user.isAdmin === 'undefined' || user.isAdmin === null) && typeof user.isPremium !== 'undefined') {
    user.isAdmin = !!user.isPremium
  }
  delete user.isPremium

  return {
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
    tokenType: 'Bearer',
    user,
  }
}

export const refreshToken = async (refreshToken) => {
  const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET)

  const userDoc = await User.findById(decoded.userId)
  if (!userDoc) throw new Error('User not found')

  const user = userDoc.toObject()
  if ((typeof user.isAdmin === 'undefined' || user.isAdmin === null) && typeof user.isPremium !== 'undefined') {
    user.isAdmin = !!user.isPremium
  }
  delete user.isPremium

  return {
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
    tokenType: 'Bearer',
    user,
  }
}
