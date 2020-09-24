import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5rcgd',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5rcgd/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5rcp',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5rcgd/${id}/`,
    method: 'delete'
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5rcgd/${id}/`,
    method: 'put',
    data
  })
}
