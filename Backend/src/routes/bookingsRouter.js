import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createBooking, getMyBookings, getAllBookings, confirmBooking, getBookingCounts, deleteBooking } from '../controllers/bookingControllers.js'

const router = express.Router()

router.post('/', authMiddleware, createBooking)
router.get('/my', authMiddleware, getMyBookings)
router.get('/', authMiddleware, getAllBookings)
router.get('/counts', authMiddleware, getBookingCounts)
router.patch('/:id/confirm', authMiddleware, confirmBooking)
router.delete('/:id', authMiddleware, deleteBooking)

export default router
