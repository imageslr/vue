import request from '@/utils/request'

export function getFollowingActivities (uid, start = 0, count = 20) {
  return request.get(`/users/${uid}/activities/follow`, {
    params: { start, count }
  })
}

export function publishActivity (body) {
  return request.post(`/activities`, body)
}
