import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5rbgd',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5rbgd/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5rbp',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5rbgd/${id}/`,
    method: 'delete'
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5rbgd/${id}/`,
    method: 'put',
    data
  })
}
