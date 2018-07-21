import request from '@/utils/request'

// 检测手机号是否已被注册
export function checkPhoneAvailable (phone) {
  return request.get('/users/check', { params: { phone } })
}

// 注册
export function signUp (params) {
  return request.post('/users/signup', params)
}

// 登录
export function signIn (phone, password) {
  return request.post('/users/signin', { phone, password })
}

// 获取用户信息
export function getUserInfoByUID (uid) {
  return request.get(`/users/${uid}`)
}

// 获取用户信息
export function getUserInfoByToken (token) {
  return request.get(`/users?token=${token}`)
}

// 获取推荐设计师
export function getRecommendedDesignersByUID (uid) {
  return request.get(`/users/${uid}/recommended_designers`)
}
