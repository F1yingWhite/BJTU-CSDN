import axios from 'axios'
export function getUploadToken() {
    return axios({
        url: 'http://8.140.192.225:9999/domain/user/getUploadToken',
        method: 'get',
    })
}