export const validateEmail = value => {
  return /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[a-z0-9]+\.com$/i.test(value)
}

export const validatePhone = value => {
  return /^1[34578]\d{9}$/.test(value)
}

// eslint-disable-next-line
export const namePattern = /^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/

export const phonePattern = /^1[34578]\d{9}$/

export const emailPattern = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@[a-z0-9]+\.com$/i
