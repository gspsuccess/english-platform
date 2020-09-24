import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5lagd',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5lagd/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5lap',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5lagd/${id}/`,
    method: 'delete'
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5lagd/${id}/`,
    method: 'put',
    data
  })
}
