import request from '@/utils/request'

// 检测手机号是否已被注册
export function checkPhoneAvailable (phone) {
  return request.post(`/checkPhone/${phone}`)
}

// 发送验证码
export function sendCode (phone) {
  return request.post(`/verificationCode`, { phone })
}

// 注册
export function signUp (params) {
  return request.post(`/users`, params)
}

// 登录
export function signIn (phone, password) {
  return request.post(`/authorizations`, { phone, password })
}

// 根据token获取当前用户信息
export function getCurrentUserInfo (token) {
  return request.get(`/user`)
}

// 获取用户信息
export function getUserInfoByUID (uid) {
  return request.get(`/users/${uid}`)
}

// 获取推荐设计师
export function getRecommendedDesignersByUID (uid) {
  return request.get(`/users/${uid}/recommended_designers`)
}

// 搜索设计师
export function searchDesignersByName (name, params) {
  params = {
    type: 'designer',
    name,
    ...params
  }
  return request.get('/users', { params })
}
