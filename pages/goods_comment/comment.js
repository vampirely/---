import {
  request
} from '../../request/index.js';
// 支持es7的async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment_list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var   goods_id=options.goods_id
    request({
      url: "/order/showcomment",
      data: {
        goods_id
      }
    }).then((res) => {
      this.setData({comment_list:res.data.message})
    });
  }
})