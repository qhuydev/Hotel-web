import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import Room from '../models/Room.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { createRoom, updateRoom, deleteRoom } from '../controllers/roomsControllers.js'

const router = express.Router();

// Setup multer storage to Backend/uploads
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// routes is under src/routes, we want project root at Backend (two levels up)
const projectRoot = path.resolve(__dirname, '..', '..')
const uploadsPath = path.join(projectRoot, 'uploads')
console.info('roomsRouter: uploadsPath =', uploadsPath)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage })

// ==============================
// Sample data (nếu DB rỗng)
// ==============================
const sampleRooms = [
  
];

// ==============================
// GET /api/rooms
// ==============================
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().lean();
    if (!rooms.length) {
      return res.json({ success: true, data: sampleRooms });
    }
    res.json({ success: true, data: rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==============================
// ADMIN: create, update, delete
// ==============================
// Accept multipart uploads for images and premiumImages
router.post('/', authMiddleware, upload.fields([{ name: 'images' }, { name: 'premiumImages' }]), createRoom)
router.put('/:id', authMiddleware, upload.fields([{ name: 'images' }, { name: 'premiumImages' }]), updateRoom)
router.delete('/:id', authMiddleware, deleteRoom)

// ==============================
// GET /api/rooms/:id
// ==============================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // If id is a valid ObjectId, try DB lookup; otherwise skip to sample fallback
    let room = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      room = await Room.findById(id).lean();
    }

    if (!room) {
      const found = sampleRooms.find((r) => r._id === id);
      if (!found) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
      return res.json({ success: true, data: found });
    }

    res.json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
