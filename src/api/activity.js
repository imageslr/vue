import request from '@/utils/request'

// 检测手机号是否已被注册
export function getFollowingActivities (uid, start = 0, count = 20) {
  return request.get(`/users/${uid}/activities/follow`, {
    params: { start, count }
  })
}
