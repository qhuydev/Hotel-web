import User from '../models/User.js'
    

export const searchUsers = async (query, currentUserId) => {
  return User.find({
    $and: [
      { _id: { $ne: currentUserId } },
      { isActive: true },
      {
        $or: [
          { email: { $regex: query, $options: 'i' } },
          { displayName: { $regex: query, $options: 'i' } },
        ],
      },
    ],
  })
}

export const getUserById = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  return user
}
