import request from '@/utils/request'

export function uploadImage (body) {
  return request.post('/images', body, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
