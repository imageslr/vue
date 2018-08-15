import request from '@/utils/request'

// 获取用户私信列表
export function getThreads (page = 1) {
  return request.get(`/user/messages?page=${page}`)
}

// 获取与某个用户的对话内容列表
export function getMessagesByThreadId (id, page = 1) {
  return request.get(`/messages/${id}?page=${page}`)
}

/**
 * 发送一条消息
 * @param to integer 接收用户id
 * @param body string 消息内容
 */
export function postMessage (to, body) {
  return request.post('/user/messages', {
    to,
    body
  })
}

/**
 * 发送一条消息
 */
export function postMessageByThreadId (id, body) {
  return request.post(`/messages/${id}`, { body })
}
