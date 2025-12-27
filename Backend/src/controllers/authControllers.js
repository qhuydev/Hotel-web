import * as authService from '../services/authService.js'
import { success } from '../utils/apiResponse.js'

export const register = async (req, res) => {
  const result = await authService.register(req.body)
  res.json(success('Registration successful', result))
}

export const login = async (req, res) => {
  const result = await authService.login(req.body)
  res.json(success('Login successful', result))
}

export const refresh = async (req, res) => {
  const { refreshToken } = req.body
  const result = await authService.refreshToken(refreshToken)
  res.json(success('Token refreshed', result))
}
