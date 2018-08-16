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

// 修改密码
export function changePassword (password, newPassword) {
  return request.patch(`/user/password`, {
    password,
    new_password: newPassword
  })
}

// 修改手机号
export function changePhone (code, phone) {
  return request.patch(`/user/phone`, { code, phone })
}

// 获取用户信息
export function getUserInfoByUID (uid) {
  return request.get(`/users/${uid}`)
}

// 更新当前用户信息
export function updateCurrentUserInfo (body) {
  return request.patch('/user', body)
}

// 获取推荐设计师
export function getRecommendedDesigners () {
  return request.get(`/user/recommend`)
}

// 搜索用户
export function searchUsers (page = 1, keyword = null, type = null) {
  return request.get('/users', {
    params: { page, type, keyword }
  })
}
