import request from '@/utils/request'

export function upload (type, file, config) {
  let body = new FormData()
  body.append('type', type)
  body.append('file', file)
  return request.post('/uploads', body, {
    ...config,
    timeout: 0, // 上传的时候不考虑超时
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
