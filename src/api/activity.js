import request from '@/utils/request'

export function getFollowingActivities (page = 1) {
  return request.get(`/activities/feeds?page=${page}`)
}

export function getActivitiesByUID (uid, start = 0, count = 20) {
  return request.get(`/users/${uid}/activities`, {
    params: { start, count }
  })
}

export function publishActivity (body) {
  return request.post(`/activities`, body)
}

export function deleteActivityById (id) {
  return request.delete(`/activities/${id}`)
}

export function likeActivityById (id) {
  return request.post(`/activities/${id}/likes`)
}

export function unlikeActivityById (id) {
  return request.delete(`/activities/${id}/likes`)
}
