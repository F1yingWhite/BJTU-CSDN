import request from '@/utils/request'

export function send(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/add',
    method: 'post',
    data
  })
}
export function sendcomment(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/comments/add',
    method: 'post',
    data
  })
}

export function add1(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/addXihuan',
    method: 'post',
    data
  })
}
export function remove1(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/removeXihuan',
    method: 'post',
    data
  })
}
export function remove2(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/removeCollect',
    method: 'post',
    data
  })
}
export function remove3(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/remove',
    method: 'post',
    data
  })
}
export function remove4(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/user/remove',
    method: 'post',
    data
  })
}

export function add2(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/addCollect',
    method: 'post',
    data
  })
}
export function add3(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/article/addView',
    method: 'post',
    data
  })
}

export function add4(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/collectArt/addRelation',
    method: 'post',
    data
  })
}

export function remove5(data) {
  return request({
    url: 'http://8.140.192.225:9999/domain/collectArt/removeRelation',
    method: 'post',
    data
  })
}



export function find(titles) {
  var con = {};
  con['title'] = titles;
  con = JSON.stringify(con);
  return request({
    url: 'http://8.140.192.225:9999/domain/article/getOneArticle',
    method: 'get',
    params: { id: titles }
  })
}

export function findcom(titles) {
  var con = {};
  con['title'] = titles;
  con = JSON.stringify(con);
  return request({
    url: 'http://8.140.192.225:9999/domain/comments/getSpecComments',
    method: 'get',
    params: { aid: titles }
  })
}

export function getAll() {
  return request({
    url: 'http://8.140.192.225:9999/domain/user/all',
    method: 'get'
  })
}

export function getList(titles) {
  var con = {};
  con['title'] = titles;
  con = JSON.stringify(con);
  return request({
    url: 'http://8.140.192.225:9999/domain/user/specinfo',
    method: 'get',
    params: { id: titles }
  })
}
