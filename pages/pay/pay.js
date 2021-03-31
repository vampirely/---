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
        cart: [],
        totalPrice: 0,
        totalNum: 0
      },
      
      //onLoad onShow
      onShow() {
        //获取缓存中的地址
        const address = wx.getStorageSync("address");
        //获取缓存中的购物车数据
        let cart = wx.getStorageSync("Cart") || [];
        //过滤后的购物车数组
        cart = cart.filter(v => v.IsChecked);

        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {

          totalPrice += v.num * v.goods_price;
          totalNum += v.num;
        });

        this.setData({
          cart,
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
      handleOrderPay(){
        
          //判断缓存中有没有token
           const token =wx.getStorageSync("token");
           if(!token){
             wx.navigateTo({
               url: '/pages/auth/auth',
             });
               return;
           }
             console.log("cunzai");
      }

      })