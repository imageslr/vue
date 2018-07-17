import request from '@/utils/request'

// 检测手机号是否已被注册
export function checkPhoneAvailable (phone) {
  return request.get('/users/check', { params: { phone } })
}

export function signUp (params) {
  return request.post('/users/signup', params)
}

export function signIn (phone, password) {
  return request.post('/users/signin', { phone, password })
}

export function getUserInfoByUID (uid) {
  return request.get(`/users/${uid}`)
}

export function getUserInfoByToken (token) {
  return request.get(`/users?token=${token}`)
}
