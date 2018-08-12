import request from '@/utils/request'

export function addWork (body) {
  return request.post('/works', body)
}

export function getWorksByUID (uid, page = 1) {
  return request.get(`/users/${uid}/works?page=${page}`)
}
