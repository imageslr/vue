import request from '@/utils/request'

export function getNotificationsOfCurrentUser (page = 1, type = 'all') {
  return request.get(`/user/notifications?page=${page}&type=${type}`)
}

export function markAsReadById (id) {
  return request.put(`/user/read/notifications/${id}`)
}

export function markAllAsRead () {
  return request.patch('user/read/notifications')
}
