import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5ragd',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5ragd/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5rap',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5ragd/${id}/`,
    method: 'delete'
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5ragd/${id}/`,
    method: 'put',
    data
  })
}
