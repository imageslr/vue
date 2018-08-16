export function splitPhone (phone) {
  return phone.replace(/\B(?=(?:\d{4})+$)/g, ' ')
}

export function splitNumber (number) {
  return String(number).replace(/\B(?=(?:\d{3})+$)/g, ',')
}

export function getToday () {
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy
  return new Date(today)
}
