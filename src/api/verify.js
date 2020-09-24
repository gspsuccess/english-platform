import request from '@/utils/request'

export function verifyOne(data) {
  return request({
    url: '/paper/n5checkconfirm',
    method: 'post',
    data
  })
}
