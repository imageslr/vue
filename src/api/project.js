import request from '@/utils/request'

export function publishProject (body) {
  return request.post(`/projects`, body)
}

// 获取项目详情
export function getProjectById (id) {
  return request.get(`/projects/${id}`)
}

// 补充项目
export function updateProjectById (id, data) {
  return request.patch(`/projects/${id}`, data)
}

// 填写项目的汇款信息
export function updateProjectRemittanceById (id, remittance) {
  return request.patch(`/projects/${id}/remittance`, { remittance })
}

// 申请重新审核
export function reReviewProjectById (id) {
  return request.put(`/user/reviewing/projects/${id}`)
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

// 收藏项目
export function favoriteProjectById (id) {
  return request.put(`/user/favoriting/projects/${id}`)
}

// 取消收藏
export function unfavoriteProjectById (id) {
  return request.delete(`/user/favoriting/projects/${id}`)
}

// 报名项目
export function applyProjectById (id, body) {
  return request.post(`/projects/${id}/applications`, body)
}

// 取消报名
export function cancelApplyProjectById (id) {
  return request.delete(`/user/applying/projects/${id}`)
}

// 接受邀请
export function acceptInvitationByProjectId (id) {
  return request.put(`/projects/${id}/accepted/invitations`)
}

// 拒绝邀请
export function declineInvitationByProjectId (id, refusal_cause) {
  return request.put(`/projects/${id}/declined/invitations`, { refusal_cause })
}

// 获取项目列表
export function getProjectsOfCurrentUser (page = 1, params = {}) {
  return request.get(`/user/projects?page=${page}`, { params })
}

// 获取进行中的项目
export function getProcessingProjectsOfCurrentUser (page = 1, params = {}) {
  return request.get(`/user/processing/projects?page=${page}`, { params })
}

// 获取当前用户收藏的项目
export function getFavoriteProjectsOfCurrentUser (page, params) {
  return request.get(`/user/favoriting/projects?page=${page}`, { params })
}

// 获取推荐给当前用户的项目
export function getRecommendProjectsOfCurrentUser (page = 1) {
  return request.get(`/user/recommended/projects?page=${page}`)
}

// 搜索项目
export function searchProjects (page = 1, params = {}) {
  return request.get('/projects', {
    params: { page, ...params }
  })
}

// 获取一个项目的报名列表
export function getApplicationsByProjectId (id, page = 1) {
  return request.get(`/projects/${id}/applications?page=${page}`)
}

// 获取一个项目的邀请列表
export function getInvitationsByProjectId (id, page = 1) {
  return request.get(`/projects/${id}/invitations?page=${page}`)
}

// 提交交付文件
export function deliverProjectById (id, body) {
  return request.post(`/projects/${id}/deliveries`, body)
}

// 获取一个项目的交付列表
export function getDeliveriesByProjectId (id, page = 1) {
  return request.get(`/projects/${id}/deliveries?page=${page}`)
}
