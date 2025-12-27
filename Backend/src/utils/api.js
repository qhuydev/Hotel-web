export const API_BASE = process.env.VITE_API_URL || 'http://localhost:8017/api'
export const API_ORIGIN = API_BASE.replace(/\/api$/, '')

// Hàm tạo URL ảnh
export function getImageUrl(path) {
   if (!path) return '/placeholder.jpg'; 
  if (path.startsWith('http')) return path
  return `${API_ORIGIN}${path}`  // <-- đây sẽ ghép path đúng với static backend
}
