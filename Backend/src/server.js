// src/server.js

import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import mongoose from "mongoose";
import { ensureDefaultTemplates } from './services/messageService.js'


// ===== CONNECT MONGODB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 8017;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

    // ensure default templates exist
    ensureDefaultTemplates().catch(err => console.error('Failed to create default message templates', err.message))
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
