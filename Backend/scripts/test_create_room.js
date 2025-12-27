import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

async function run() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQ3ZDA2ZDk1NzBmZmIyOGZkOTEzYmIiLCJpYXQiOjE3NjYzMTQxMTMsImV4cCI6MTc2NjMxNTAxM30.x9lS9sOOi7IliRs7DlAiiu5RxQSasypFo0hfjg-DYGI'
  const form = new FormData()
  form.append('title', 'Test Room From Script')
  form.append('price', '123456')
  form.append('description', 'desc')
  // pick an existing file from uploads
  const imgPath = '../uploads/anh1.jpg'
  if (fs.existsSync(imgPath)) form.append('images', fs.createReadStream(imgPath))

  const res = await axios.post('http://localhost:8017/api/rooms', form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${token}`
    }
  })
  console.log(res.data)
}

run().catch(err => { console.error(err.response?.data || err.message) })