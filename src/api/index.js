import request from '@/utils/request'

export function getIndexDesigners () {
  return request.get('/index/designers')
}
