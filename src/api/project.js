import request from '@/utils/request'

export function publishProject (body) {
  return request.post(`/projects`, body)
}

// 获取项目详情
export function getProjectById (id) {
  return request.get(`/projects/${id}`)
}

// 补充项目
export function supplementProjectById (id, data) {
  return request.patch(`/projects/${id}`, data)
}

// 取消发布
export function cancelProjectById (id) {
  return request.put(`/user/canceled/projects/${id}`)
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

// 获取一个项目邀请的设计师
export function getInvitedDesignersByReqId (id, start = 0) {
  return request.get(`/projects/${id}/designers/invited?start=${start}`)
}

// 获取一个项目报名的设计师
export function getApplyDesignersByReqId (id, start = 0) {
  return request.get(`/projects/${id}/designers/apply?start=${start}`)
}

// 收藏项目
export function favoriteProjectById (id) {
  return request.put(`/user/favoriting/projects/${id}`)
}

// 取消收藏
export function unfavoriteProjectById (id) {
  return request.delete(`/user/favoriting/projects/${id}`)
}

// 报名项目

// 取消报名
