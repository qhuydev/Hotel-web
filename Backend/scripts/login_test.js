import axios from 'axios'

async function run() {
  const res = await axios.post('http://localhost:8017/api/auth/login', { email: 'admin@example.com', password: 'password123' })
  console.log(res.data)
}

run().catch(err => console.error(err.response?.data || err.message))