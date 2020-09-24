import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/paper/n5truepapername',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/paper/n5truepapername/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/paper/n5truepapername',
    method: 'post',
    data
  })
}

export function updateOne(id, data) {
  return request({
    url: `/paper/n5truepapername/${id}/`,
    method: 'patch',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/paper/n5truepapername/${id}/`,
    method: 'delete'
  })
}
