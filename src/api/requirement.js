import request from '@/utils/request'

export function getInvitedDesignersByReqId (id, start = 0) {
  return request.get(`/requirements/${id}/invited?start=${start}`)
}

export function invite (reqId, uid) {
  return request.post(`/requirements/${reqId}/invite`, {
    user_id: uid
  })
}

export function recall (reqId, uid) {
  return request.post(`/requirements/${reqId}/recall`, {
    user_id: uid
  })
}

export function publish (body) {
  return request.post(`/requirements`, body)
}
