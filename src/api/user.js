import request from '@/utils/request'

// 检测手机号是否已被注册
export function checkPhoneAvailable (phone, type) {
  return request.post(`/users/check`, { phone, type })
}

// 发送验证码
export function sendCode (phone, userType, actionType) {
  return request.post(`/verificationCode`, {
    phone,
    user_type: userType,
    action_type: actionType
  })
}

// 注册
export function signUp (params) {
  return request.post(`/users`, params)
}

// 登录
export function signIn (phone, password, type) {
  return request.post(`/authorizations`, { phone, password, type })
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

// 重置密码
export function resetPassword (body) {
  return request.patch(`/users/reset`, body)
}

// 发送激活邮件
export function sendActiveMail () {
  return request.post(`/user/mails`)
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

// 搜索用户以邀请评价
export function searchUsersToInviteReview (page = 1, keyword = null) {
  return request.get('/users', {
    params: { page, keyword, invite_to_review: true }
  })
}
