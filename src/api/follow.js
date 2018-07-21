import request from '@/utils/request'

function follow (type, id) {
  return request.post('/follow', {
    target_type: type,
    target_id: id
  })
}
function unfollow (type, id) {
  return request.post('/unfollow', {
    target_type: type,
    target_id: id
  })
}

// 关注用户
export function followUserByUID (uid) {
  return follow('user', uid)
}

// 取消关注用户
export function unfollowUserByUID (uid) {
  return unfollow('user', uid)
}
