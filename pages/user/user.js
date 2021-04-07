import regeneratorruntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNums: 0,
    historyNums:0
  },
  handleExit(){
    wx.removeStorageSync("userInfo");
    wx.removeStorageSync("token");
    this.onShow();
  },
  //收货地址管理
  handleChooseAddress() {
    wx.chooseAddress({
      success: (address) => {
        ;
      }
    });
  },
  //意见反馈
  handleFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
      success: (result) => {

      }
    });

  },
  //关于
  handleAbout(){
wx.showModal({
  title: '关于',
  content: '基于微信小程序的手机端在线商城设计',
  showCancel: true,
  cancelText: '取消',
  cancelColor: '#000000',
  confirmText: '确定',
  confirmColor: '#3CC51F'
});
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");
    const myhistory=wx.getStorageSync("history");
    this.setData({
      userInfo,
      collectNums: collect.length,
      historyNums:myhistory.length
    })
  }
})