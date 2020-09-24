import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/token/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/token/verify/',
    method: 'post',
    data: { token: token }
  })
}

export function getAll(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function addOne(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateOne(id, data) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function getUserByToken() {
  return request({
    url: '/user/token',
    method: 'get'
  })
}

export function resetPwd(id, data) {
  return request({
    url: '/user/' + id + '/resetPwd',
    method: 'put',
    data
  })
}
