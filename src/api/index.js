import request from '@/utils/request'

export function getDesigners () {
  return request.get('/index/designers')
}

export function getWorks () {
  return request.get('/index/works')
}

export function getProjects (page = 1) {
  return request.get(`/index/projects?page=${page}`)
}
