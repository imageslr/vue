import request from '@/utils/request'

export function getPaymentById (id) {
  return request.get(`/payments/${id}`)
}

export function getPayments (page = 1) {
  return request.get(`/payments?page=${page}`)
}
