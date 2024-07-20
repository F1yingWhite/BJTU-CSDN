import request from '@/utils/request'

export function register(data) {
    return request({
        url: 'http://8.140.192.225:9999/domain/user/add',
        method: 'post',
        data
    })
}

