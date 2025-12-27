import express from 'express'
import * as authController from '../controllers/authControllers.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.refresh)

export default router
