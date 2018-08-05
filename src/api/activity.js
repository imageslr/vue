import request from '@/utils/request'

export function getFollowingActivities (page = 1) {
  return request.get(`/user/feeds?page=${page}`)
}

export function getActivitiesByUID (uid, page = 1) {
  return request.get(`/users/${uid}/activities?page=${page}`)
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

export function deleteReply (acitvityId, replyId) {
  return request.post(`/activities/${acitvityId}/replies/${replyId}`)
}
