export function splitPhone (phone) {
  return phone.replace(/\B(?=(?:\d{4})+$)/g, ' ')
}
