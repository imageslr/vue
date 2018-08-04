import request from '@/utils/request'

// 关注用户
export function followUserByUID (uid) {
  return request.put(`/user/following/${uid}`)
}

// 取消关注用户
export function unfollowUserByUID (uid) {
  return request.delete(`/user/following/${uid}`)
}

// 获取某个用户关注的人
export function getFollowingUsersByUID (uid, page = 1) {
  return request.get(`/users/${uid}/following?page=${page}`)
}

// 获取关注某个用户的人
export function getFollowersByUID (uid, page = 1) {
  return request.get(`/users/${uid}/followers?page=${page}`)
}
