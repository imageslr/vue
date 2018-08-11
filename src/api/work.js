import request from '@/utils/request'

export function addWork (body) {
  return request.post('/works', body)
}
