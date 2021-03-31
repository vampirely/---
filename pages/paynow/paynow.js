/**
   页面加载
   从缓存获取购物车数据
   渲染到页面
   这些数据的check=true
   */
/**
 微信支付
  企业账号
  企业账号的小程序后台 添加白名单
   一个appid同时绑定多个开发者
  
 */
/**
支付按钮
 判断缓存中有没有token
 没有 跳转到授权进而获取token
 有token  
 
*/
import regeneratorruntime from '../../lib/runtime/runtime'; //小程序 es7 的async await 语法 在有的机型上不适用 需要下载facebook的 regenerator
Page({
  /**
   * 点击按钮事件
   */
  data: {
    address: {},
    goodsNow: [],
    totalPrice: 0,
    totalNum: 0
  },

  //onLoad onShow
  onShow() {
    //获取缓存中的地址
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let goodsNow = wx.getStorageSync("goodsNow") || [];
    //过滤后的购物车数组

    let totalPrice = 0;
    let totalNum = 0;
    goodsNow.forEach(v => {

      totalPrice = v.goods_price;
      totalNum =1;
    });

    this.setData({
      goodsNow,
      address,
      totalPrice,
      totalNum
    });

  },
  
  handleChooseAddress() {
    wx.chooseAddress({
      success: (address) => {
        address.allAddress = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync("address", address);
      }
    });
  },
  //点击支付
  handleOrderPay() {
    //判断缓存中有没有token
    const {
      address
    } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '请添加【收货地址】',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          console.log(address.userName);
        }
      });
    }
    else{
      console.log("点击支付");
    }
    // const token = wx.getStorageSync("token");
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/auth',
    //   });
    //   return;
    // }
    // console.log("cunzai");
  }

})