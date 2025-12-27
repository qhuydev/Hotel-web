export const success = (message, data) => ({
  success: true,
  message,
  data,
})

export const error = (message) => ({
  success: false,
  message,
})
