//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //loucen数组
    floorList: []

  },
  //options(Object)页面开始加载触发
  onLoad: function (options) {
    // //发送异步请求获取轮播图 优化的手段可以通过es6的promise来解决这个问题
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }

    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
  },
  //获取导航图表
  getCateList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result.data.message
        })
      })
  }
  ,
  //获取楼层数据
  getFloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
  }


});
