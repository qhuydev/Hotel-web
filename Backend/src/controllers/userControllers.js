import * as userService from '../services/userService.js'
import { success } from '../utils/apiResponse.js'

export const searchUsers = async (req, res) => {
  const users = await userService.searchUsers(
    req.query.query,
    req.user._id
  )
  res.json(success('Users found', users))
}

export const getMe = async (req, res) => {
  res.json(success('Current user', req.user))
}

export const getById = async (req, res) => {
  const user = await userService.getUserById(req.params.userId)
  res.json(success('User found', user))
}
