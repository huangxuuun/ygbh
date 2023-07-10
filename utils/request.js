const Tips = (title) => {
    uni.showToast({
        title
    })
}
const baseURL = process.env.NODE_ENV === 'development' ? "http://43.139.80.74:8888/api/v1" : "https://www.xxx.cn";

export default async function request(params) {
    return new Promise((reslove, reject) => {
        if (params.loading) uni.showLoading();

        uni.request({
            url: baseURL + params.url,
            method: params.method,
            header: {
                'Content-Type': 'application/json',
                'Token': uni.getStorageSync('TOKEN')
            },
            data: params.data,
            complete: () => {
                if (params.loading) uni.hideLoading();
            },
            success: (res) => {
                if (res.statusCode == 200) {
                    if (res.data.code == 200) {
                        reslove(res.data);
                    } else if (res.data.code == 401) {
                        return Tips('登录过期，请重新登录');
                    } else {
                        return Tips(res.data.msg);
                    }
                } else {
                    return Tips('网络异常，请稍后再试！');
                }
            },
            fail: (err) => {
                return Tips('连接失败，请稍后再试！');
            }
        })
    })
}