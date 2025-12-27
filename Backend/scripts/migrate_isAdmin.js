#!/usr/bin/env node

/**
 * One-off migration script to ensure all users have `isAdmin` set.
 * - If user.isPremium === true => set isAdmin = true
 * - If isAdmin is missing/null and isPremium !== true => set isAdmin = false
 *
 * Usage:
 *   node scripts/migrate_isAdmin.js
 *
 * Requires: Back-end .env with MONGO_URI
 */

import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import User from '../src/models/User.js'

const MONGO = process.env.MONGO_URI
if (!MONGO) {
  console.error('MONGO_URI not set in .env')
  process.exit(1)
}

async function run() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Connected to MongoDB')

  // 1) Set isAdmin=true for users with isPremium === true
  const res1 = await User.updateMany({ isPremium: true }, { $set: { isAdmin: true } })
  console.log('Updated isAdmin=true for users with isPremium=true:', res1.nModified || res1.modifiedCount)

  // 2) Set isAdmin=false where isAdmin missing or null and isPremium !== true
  const res2 = await User.updateMany({ $and: [ { $or: [ { isAdmin: { $exists: false } }, { isAdmin: null } ] }, { $or: [ { isPremium: { $exists: false } }, { isPremium: { $ne: true } } ] } ] }, { $set: { isAdmin: false } })
  console.log('Set isAdmin=false for users missing the field:', res2.nModified || res2.modifiedCount)

  // 3) (Optional) remove isPremium field from all documents - commented out by default
  // const res3 = await User.updateMany({}, { $unset: { isPremium: "" } })
  // console.log('Removed isPremium from all users:', res3.nModified || res3.modifiedCount)

  await mongoose.disconnect()
  console.log('Migration finished')
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
