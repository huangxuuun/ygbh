import request from '../utils/request.js'


//微信购买会员
export function wechatBuy(id) {
    return request({
        url: '/vip/buy/wechat',
        method: 'POST',
        data:{
            id
        },
        loading: true, //是否开启loading动画
    })
}


//支付宝购买会员
export function alipayBuy(id) {
    return request({
        url: '/vip/buy/alipay',
        method: 'POST',
        data:{
            id
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
export function vipStatus() {
    return request({
        url: '/vip/status',
        method: 'POST',
        loading: true, //是否开启loading动画
    })
}


export function paymentStatus(orderNo) {
    return request({
        url: '/vip/payment-status',
        method: 'POST',
        data: {
          orderNo
        }
    })
}