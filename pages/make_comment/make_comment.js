// 引入封装好的请求数据的js文件
import {
  request
} from '../../request/index.js';
// 支持es7的async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 统一满分为5星
   */
  data: {
    star1: 0,
    star2: 5,
    goods_id: Number,
    content: "",
    order_id: Number
  },
  onLoad: function (options) {
    this.data.goods_id = options.goods_id;
    this.data.order_id = options.order_id;
  },
  //情况二:用户给评分
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var star1;
    if (in_xin === 'use_sc2') {
      star1 = Number(e.currentTarget.id);
    } else {
      star1 = Number(e.currentTarget.id) + this.data.star1;
    }
    this.setData({
      star1: star1,
      star2: 5 - star1
    })
  },
  handleComment() {
    if (this.data.star1 == 0 || this.data.content == "") {
      wx.showToast({
        title: '请检查填写内容是否完整~',
        icon: 'none',
        duration: 1500,
      });

    } else {
      request({
          method: "POST",
          data: {
            goods_id: this.data.goods_id,
            star_num: this.data.star1,
            content: this.data.content,
            order_id: this.data.order_id
          },
          url: "/order/comment"
        })
        .then(result => {
          if (result.data.status === 200) {
            wx.showToast({
              title: result.data.message,
              icon: 'success',
              duration: 1500,
              complete: () => {
                wx.navigateBack({
                  delta: 1
                })
              }
            });

          } else {
            wx.showToast({
              title: result.data.message,
              icon: 'error',
              duration: 1500,
            });
          }
        })
    }

  },
  //获取输入框的内容
  handleGetText(e) {
    this.data.content = e.detail.value
  }





})