import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/listen/listentest',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/listen/listentest/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/listen/listentest',
    method: 'post',
    data
  })
}

export function updateOne(id, data) {
  return request({
    url: `/listen/listentest/${id}/`,
    method: 'patch',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/listen/listentest/${id}/`,
    method: 'delete'
  })
}
