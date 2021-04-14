// pages/login/login.js
import regeneratorruntime, {
  async
} from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js"
Page({
  data: {
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('获取用户信息成功', res.userInfo);
        wx.setStorageSync("user", res.userInfo);
        wx.login({
          //获取code
          success: function (res) {
            request({
              url: '/userLogin',
              data: {
                code: res.code,
                avatarUrl: wx.getStorageSync("user").avatarUrl,
                nickName: wx.getStorageSync("user").nickName,
                gender: wx.getStorageSync("user").gender
              }
            }).then(res => {
              if (res.data.status === 200) {
                wx.setStorageSync("token", res.data.token);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 1500,
                  mask: false,
                });

              }

            })
          }
        });
        wx.setStorageSync("userInfo", res.userInfo);
        wx.showToast({
          title: '授权登录成功',
          icon: 'sucess',
          duration: 2000,
          mask: false,
          success: (result) => {
            wx.navigateBack({
              delta: 1
            });
          }
        });



      }
    })
  }
})