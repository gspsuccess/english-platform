import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5wb',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5wb/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5wb',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5wb/${id}/`,
    method: 'delete'
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5wb/${id}/`,
    method: 'put',
    data
  })
}
