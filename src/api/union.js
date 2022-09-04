import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/poiUnion/list',
    method: 'get',
    params: params
  })
}

export function createUnion(data) {
  return request({
    url: '/poiUnion/create',
    method: 'post',
    data: data
  })
}


export function updateUnion(id, data) {
  return request({
    url: '/poiUnion/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/poiUnion/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteUnion(id) {
  return request({
    url: '/poiUnion/delete/' + id,
    method: 'post'
  })
}
