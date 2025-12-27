#!/usr/bin/env node
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import User from '../src/models/User.js'
import bcrypt from 'bcryptjs'

const MONGO = process.env.MONGO_URI
if (!MONGO) {
  console.error('MONGO_URI not set')
  process.exit(1)
}

async function run() {
  await mongoose.connect(MONGO)
  const email = 'admin@example.com'
  const exists = await User.findOne({ email })
  if (exists) {
    console.log('Admin already exists:', email)
    console.log(exists)
    process.exit(0)
  }
  const hashed = await bcrypt.hash('password123', 10)
  const user = await User.create({ email, password: hashed, displayName: 'Admin User', isAdmin: true })
  console.log('Created admin', user.email)
  await mongoose.disconnect()
}

run().catch(err => { console.error(err); process.exit(1) })