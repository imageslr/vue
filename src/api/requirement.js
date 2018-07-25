import request from '@/utils/request'
export function publishRequirement (body) {
  return request.post(`/requirements`, body)
}

// 获取需求详情
export function getReqDetailById (reqId) {
  return request.get(`/requirements/${reqId}`)
}

// 补充需求 TODO: url
export function supplementRequirementById (reqId, data) {
  return request.post(`/requirements2/${reqId}`, data)
}

// 取消发布 TODO: url
export function cancelRequirementById (reqId) {
  return request.delete(`/requirements3/${reqId}`)
}

// 收藏需求
export function favoriteReqById (id) {
  return request.post(`/requirements/${id}/favorite`)
}

// 取消收藏
export function unfavoriteReqById (id) {
  return request.post(`/requirements/${id}/unfavorite`)
}

// 邀请设计师
export function invite (reqId, uid) {
  return request.post(`/requirements/${reqId}/designers/invite`, {
    user_id: uid
  })
}

// 撤销邀请
export function recall (reqId, uid) {
  return request.post(`/requirements/${reqId}/designers/recall`, {
    user_id: uid
  })
}

// 获取一个需求邀请的设计师
export function getInvitedDesignersByReqId (id, start = 0) {
  return request.get(`/requirements/${id}/designers/invited?start=${start}`)
}

// 获取一个需求邀请的设计师
export function getApplyDesignersByReqId (id, start = 0) {
  return request.get(`/requirements/${id}/designers/apply?start=${start}`)
}
