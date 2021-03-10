//t同时发送异步代码次数
let ajaxTimes = 0;
export const request = (params) => {
    //定义公共url部分
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    //const baseUrl = "http://49.235.230.192:3001/api"
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
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
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