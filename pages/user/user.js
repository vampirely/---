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
    historyNums: 0
  },
  //退出登录
  handleExit() {
    wx.removeStorageSync("userInfo");
    wx.removeStorageSync("token");
    wx.showToast({
      title: '已退出',
      icon: 'none',
      duration: 1500,
      mask: false
    });
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
  handleAbout() {
    wx.showModal({
      title: '关于',
      content: ' Programmed by Communication engineering 1705 Li Huan',
      showCancel: false,
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.showToast({
            title: 'Hello',
            image: '/icons/swust.png',
            duration: 1500,
          });
        }
      }
    });



  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");
    const myhistory = wx.getStorageSync("history");
    this.setData({
      userInfo,
      collectNums: collect.length,
      historyNums: myhistory.length
    })
  }
})