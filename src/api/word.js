import request from '@/utils/request'

export function getAll(params) {
  return request({
    url: '/word/wordtest',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: `/word/wordtest/${id}/`,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/word/wordtest',
    method: 'post',
    data
  })
}

export function updateOne(id, data) {
  return request({
    url: `/word/wordtest/${id}/`,
    method: 'patch',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: `/word/wordtest/${id}/`,
    method: 'delete'
  })
}
