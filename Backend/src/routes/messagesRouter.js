import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { listTemplates, createTemplate, updateTemplate, deleteTemplate, listLogs, listMyLogs, sendMessage, getConversation, markConversationRead, deleteMessage, getAdmin, getConversationsForAdmin } from '../controllers/messageControllers.js'

const router = express.Router()

// admin only: manage templates and view logs
router.use(authMiddleware)
router.get('/templates', listTemplates)
router.post('/templates', createTemplate)
router.put('/templates/:id', updateTemplate)
router.delete('/templates/:id', deleteTemplate)

router.get('/logs', listLogs)
router.get('/my', listMyLogs)
router.post('/send', sendMessage)

// conversation endpoints
router.get('/conversation/:otherUserId', getConversation)
router.put('/conversation/:otherUserId/read', markConversationRead)
router.delete('/:id', deleteMessage)

// admin helpers
router.get('/admin', getAdmin)
router.get('/conversations', getConversationsForAdmin)

export default router
