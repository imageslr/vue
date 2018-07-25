import request from '@/utils/request'

export function getOrdersByUID (uid, params) {
  return request.get(`/users/${uid}/orders`, { params })
}
