// src/app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import roomsRoutes from "./routes/roomsRouter.js";
import bookingsRoutes from "./routes/bookingsRouter.js";
import messagesRoutes from "./routes/messagesRouter.js";

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// Determine project root relative to this file (Backend/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
console.log(`Static files served from ${projectRoot}`);

// Ensure uploads and public/images folders exist
import fs from 'fs'
const uploadsDir = path.join(projectRoot, 'uploads')
const publicImagesDir = path.join(projectRoot, 'public', 'images')
try {
  fs.mkdirSync(uploadsDir, { recursive: true })
  fs.mkdirSync(publicImagesDir, { recursive: true })
  console.info('Ensured static directories exist:', uploadsDir, publicImagesDir)
} catch (err) {
  console.warn('Failed to create static directories', err.message)
}

// Serve uploads and public images
// uploads
app.use('/uploads', express.static(uploadsDir));

// public/images → URL: /images/filename
app.use('/images', express.static(publicImagesDir));


// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/messages", messagesRoutes);

// ===== HEALTH CHECK =====
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Hotel API is running 🚀",
  });
});

export default app;
