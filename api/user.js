import request from '../utils/request.js'

//发送验证码

export function sendCode({mobile}) {
    return request({
        url: '/user/send-code',
        method: 'POST',
        data: {
            mobile
        },
        loading: true, //是否开启loading动画
    })
}

//用户信息
export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'POST',
        loading: true, //是否开启loading动画
    })
}
//登录
export function login({mobile,code}) {
    return request({
        url: '/user/login',
        method: 'POST',
        data: {
            mobile,
            code
        },
        loading: true, //是否开启loading动画
    })
}

//绑定邀请码
export function bindUserCode({code}) {
    return request({
        url: '/user/submit-invitation',
        method: 'POST',
        data: {
            code
        },
        loading: true, //是否开启loading动画
    })
}

