import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'http://8.140.192.225:9999/domain/user/info',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: 'http://8.140.192.225:9999/domain/user/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/user/changePassword',
    method:'post',
    data
  })
}

export function changeface(data){
  return request({
    url: 'http://8.140.192.225:9999/domain/user/changeUserface',
    method:'post',
    data
  })
}

export function altInform(data){
  return request({
    url: 'http://8.140.192.225:9999/domain/user/alterUser',
    method: 'post',
    data
  })
}
