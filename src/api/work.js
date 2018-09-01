import request from '@/utils/request'

export function addWork (body) {
  return request.post('/works', body)
}

export function getWorksByUID (uid, page = 1) {
  return request.get(`/users/${uid}/works?page=${page}`)
}

export function deleteWorkById (id) {
  return request.delete(`/works/${id}`)
}

// 获取所有作品
export function getWorks (page = 1) {
  return request.get(`/works?page=${page}`)
}

export function likeWorkById (id) {
  return request.post(`/works/${id}/likes`)
}

export function unlikeWorkById (id) {
  return request.delete(`/works/${id}/likes`)
}
