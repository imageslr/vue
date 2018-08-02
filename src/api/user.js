import request from '@/utils/request'

// 检测手机号是否已被注册
export function checkPhoneAvailable (phone) {
  return request({
    url: `/checkPhone/${phone}`,
    method: 'post',
    errMsg: {
      409: ['该手机号已被注册', 'The phone number has been registered']
    }
  })
}

// 发送验证码
export function sendCode (phone) {
  return request({
    url: `/verificationCode`,
    method: 'post',
    data: { phone },
    errMsg: {
      429: [
        '请求过于频繁，请过一分钟再试',
        'Too many requests. Please try again after one minute'
      ]
    }
  })
}

// 注册
export function signUp (params) {
  return request({
    url: `/users`,
    method: 'post',
    data: params,
    errMsg: {
      401: ['验证码错误', 'Wrong validation code'],
      409: ['该手机号已被注册', 'The phone number has been registered'],
      422: ['验证码已失效', 'The validation code is expired']
    }
  })
}

// 登录
export function signIn (phone, password) {
  return request.post('/users/signin', { phone, password })
}

// 获取用户信息
export function getUserInfoByUID (uid) {
  return request.get(`/users/${uid}`)
}

// 根据token获取用户信息
export function getUserInfoByToken (token) {
  return request.get(`/users/token?token=${token}`)
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
