import request from '@/utils/request'

// 获取收到的评价
export function getReceivedReviewsByUID (uid, page = 1, per_page = 20) {
  return request.get(`/users/${uid}/reviews`, {
    params: { page, per_page }
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
