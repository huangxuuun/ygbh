import request from '../utils/request.js'

//微信支付回调

export function wechatCallBack() {
    return request({
        url: '/pay/notify/wechat',
        method: 'POST',
        loading: true, //是否开启loading动画
    })
}




//微信购买会员
export function wechatBuy({id,payType}) {
    return request({
        url: '/vip/buy/wechat',
        method: 'POST',
        data:{
            id,
            payType
        },
        loading: true, //是否开启loading动画
    })
}



//会员套餐列表

export function getVipList() {
    return request({
        url: '/vip/package-list',
        method: 'POST',
        loading: true, //是否开启loading动画
    })
}




//用户会员状态


export function wechatCallBack() {
    return request({
        url: '/vip/status',
        method: 'POST',
        loading: true, //是否开启loading动画
    })
}


