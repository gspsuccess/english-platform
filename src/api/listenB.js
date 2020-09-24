import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5lb',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5lb/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5lb',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5lb/${id}/`,
    method: 'delete'
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5lb/${id}/`,
    method: 'put',
    data
  })
}
