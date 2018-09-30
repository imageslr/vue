import request from '@/utils/request'

// 获取收到的评价
export function getReceivedReviewsByUID (uid, page = 1) {
  return request.get(`/users/${uid}/reviews`, {
    params: { page, include: 'reviewer' }
  })
}

// 获取发表的评价
export function getPostedReviewsByUID (uid, page = 1) {
  return request.get(`/users/${uid}/reviews`, {
    params: { page, type: 'posted', include: 'user' }
  })
}

// 邀请评价
export function inviteUserByUID (uid) {
  return request.post('/user/reviews/users', {
    invited_user_id: uid
  })
}

// 评价一名用户
export function reviewUserByUID (uid, content) {
  return request.post(`/users/${uid}/reviews`, { content })
}

// 删除一条评价
export function deleteReviewById (id) {
  return request.delete(`/reviews/${id}`)
}

// 置顶一条评价
export function stickReviewById (id) {
  return request.put(`/reviews/${id}/stick`)
}

// 取消置顶一条评价
export function unstickReviewById (id) {
  return request.put(`/reviews/${id}/unstick`)
}

// 获取评价状态：是否评价了某位用户
export function getReviewStatusByUID (uid) {
  return request.get(`/user/reviews/status?uid=${uid}`)
}

// 获取评价状态：是否可以评价某位用户
export function canReviewUser (uid) {
  return request.get(`/user/can_review?uid=${uid}`)
}
