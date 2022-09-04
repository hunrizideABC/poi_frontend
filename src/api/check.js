import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/poiCheck/list',
    method: 'get',
    params: params
  })
}

export function updateCheck(id, data) {
  return request({
    url: '/poiCheck/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/poiCheck/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function offlineCheck(id, params) {
  return request({
    url: '/poiCheck/offline/' + id,
    method: 'post',
    params: params
  })
}
