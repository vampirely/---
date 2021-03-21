// pages/login/login.js
import regeneratorruntime, {
  async
} from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js"
Page({

  handleGetUserInfo(e) {
    console.log(e);
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });

  }

})