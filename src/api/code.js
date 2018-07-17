import request from '@/utils/request'

// 发送验证码
export function sendCode (phone) {
  return request.post('/sms', { phone })
}

// 检验验证码
export function checkCode (phone, code) {
  return request.post('/sms/check', { phone, code })
}
