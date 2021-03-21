//Page Object
import { request } from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList: [],
    //loucen数组
    floorList: []

  },
  //options(Object)页面开始加载触发
  onLoad: function (options) {
    
    this.getSwiperList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList() {
    request({ url: "/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result.data.message
        })
      })
      wx.stopPullDownRefresh();
  }
  ,
  //获取楼层数据
  getFloorList() {
    request({ url: "/goodsIndex" })
      .then(result => {
        this.setData({
          floorList: result.data.message
        })
      })
      wx.stopPullDownRefresh();
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
   onPullDownRefresh: function () {
    this.getSwiperList();
    this.getFloorList();
  }
});
