export const validateEmail = value => {
  return /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[a-z0-9]+\.com$/i.test(value)
}

export const validatePhone = value => {
  return /^1[34578]\d{9}$/.test(value)
}

export const phonePattern = /^1[34578]\d{9}$/
