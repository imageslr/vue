import request from '@/utils/request'

// 获取收到的评论
export function getReceivedReviewsByUID (uid, start = 0) {
  return request.get(`/users/${uid}/reviews?type=received`, {
    params: { start }
  })
}
