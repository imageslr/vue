export function splitPhone (phone) {
  return phone.replace(/\B(?=(?:\d{4})+$)/g, ' ')
}

export function splitNumber (number) {
  return String(number).replace(/\B(?=(?:\d{3})+$)/g, ',')
}
