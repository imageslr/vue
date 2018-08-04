import request from '@/utils/request'

// 获取收到的评论
export function getReceivedReviewsByUID (uid, page = 1, per_page = 20) {
  return request.get(`/users/${uid}/reviews`, {
    params: { page, per_page }
  })
}
