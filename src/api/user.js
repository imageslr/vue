import request from '@/utils/request'

export function getUserInfo () {}

export function signUp (params) {
  return request.post('/users', params)
}
