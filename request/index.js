//t同时发送异步代码次数
let ajaxTimes = 0;
export const request = (params) => {
    //定义公共url部分
    //const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    //const baseUrl = "https://49.235.230.192:3001/api"
    //const baseUrl = "https://127.0.0.1:3001/api"
    const baseUrl = "https://lihuan.work:3001/api"
    return new Promise((resolve, reject) => {
        ajaxTimes++;
        //显示加载中
        wx.showLoading({
            title: '加载中',
            mask: true
        });



        wx.request({
            ...params,
            url: baseUrl + params.url,
            header: {
                token: wx.getStorageSync("token")
            },
            success: (result) => {
                if (result.data.status === 403) {
                    wx.showToast({
                        title: '登录验证失败，请重新执行登录流程。',
                        icon: 'none',
                        duration: 1500,
                        success: (result) => {
                            wx.switchTab({
                                url: '/pages/user/user',
                                success: (result) => {
                                    wx.showToast({
                                        title: '请重新登录',
                                        icon: 'none',
                                        duration: 1500,
                                    });
                                }
                            });


                        }
                    });


                } else {
                    resolve(result);
                }

            },
            fail: (err) => {
                reject(err);
                wx.showToast({
                    title: '连接服务器失败',
                    icon: 'none',
                    duration: 1500
                });

            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }

            }
        });
    })
}