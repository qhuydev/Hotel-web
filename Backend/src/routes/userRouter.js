import express from 'express'
import * as userController from '../controllers/userControllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/search', authMiddleware, userController.searchUsers)
router.get('/me', authMiddleware, userController.getMe)
router.get('/:userId', authMiddleware, userController.getById)

export default router
