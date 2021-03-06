import request from '@/utils/request'

export function getFollowingActivities (page = 1) {
  return request.get(`/user/feeds?page=${page}`)
}

export function getActivitiesByUID (uid, page = 1) {
  return request.get(`/users/${uid}/activities?page=${page}`)
}

// 获取热门动态
export function getTrendingActitivies (page = 1) {
  return request.get(`/activities/trending?page=${page}`)
}

export function publishActivity (body) {
  return request.post(`/activities`, body)
}

export function getActivityById (id) {
  return request.get(`/activities/${id}`)
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

export function postReplyByActivityId (id, body) {
  return request.post(`/activities/${id}/replies`, body)
}

export function getRepliesByActivityId (id, page = 1) {
  return request.get(`/activities/${id}/replies?page=${page}`)
}

export function getRepliesByReplyId (id, page = 1) {
  return request.get(`/replies/${id}/replies?page=${page}`)
}

export function deleteReply (activityId, replyId) {
  return request.delete(`/activities/${activityId}/replies/${replyId}`)
}
