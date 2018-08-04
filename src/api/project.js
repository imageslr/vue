import request from '@/utils/request'

export function publishProject (body) {
  return request.post(`/projects`, body)
}

// 获取需求详情
export function getReqDetailById (reqId) {
  return request.get(`/projects/${reqId}`)
}

// 补充需求 TODO: url
export function supplementProjectById (reqId, data) {
  return request.post(`/projects2/${reqId}`, data)
}

// 取消发布 TODO: url
export function cancelProjectById (reqId) {
  return request.delete(`/projects3/${reqId}`)
}

// 收藏需求
export function favoriteReqById (id) {
  return request.post(`/projects/${id}/favorite`)
}

// 取消收藏
export function unfavoriteReqById (id) {
  return request.post(`/projects/${id}/unfavorite`)
}

// 邀请设计师
export function invite (reqId, uid) {
  return request.post(`/projects/${reqId}/designers/invite`, {
    user_id: uid
  })
}

// 撤销邀请
export function recall (reqId, uid) {
  return request.post(`/projects/${reqId}/designers/recall`, {
    user_id: uid
  })
}

// 获取一个需求邀请的设计师
export function getInvitedDesignersByReqId (id, start = 0) {
  return request.get(`/projects/${id}/designers/invited?start=${start}`)
}

// 获取一个需求邀请的设计师
export function getApplyDesignersByReqId (id, start = 0) {
  return request.get(`/projects/${id}/designers/apply?start=${start}`)
}
