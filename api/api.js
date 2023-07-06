import request from './utils/request.js'

export function getUserInfo(uid) {
    return request({
        url: '/user/info',
        method: 'POST',
        data: {
            uid
        },
        loading: true, //是否开启loading动画
    })
}
