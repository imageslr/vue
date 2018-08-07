import request from '@/utils/request'

export function upload (type, file, config) {
  let body = new FormData()
  body.append('type', type)
  body.append('file', file)
  return request.post('/uploads', body, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
