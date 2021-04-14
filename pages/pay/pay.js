import regeneratorruntime from '../../lib/runtime/runtime'; //小程序 es7 的async await 语法 在有的机型上不适用 需要下载facebook的 regenerator
import {
  request
} from "../../request/index.js";
Page({
      /**
       * 点击按钮事件
       */
      data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0,
        showCenterDialog: false,
        inputData: {
          input_value: "", //输入框的初始内容
          value_length: 0, //输入框密码位数
          isNext: false, //是否有下一步的按钮
          get_focus: true, //输入框的聚焦状态
          focus_class: true, //输入框聚焦样式
          value_num: [1, 2, 3, 4, 5, 6], //输入框格子数
          height: "80rpx", //输入框高度
          width: "550rpx", //输入框宽度
          see: false, //是否明文展示
          interval: true, //是否显示间隔格子
        }
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
        
        wx.showToast({
          icon: 'loading',
          mask: true,
          duration:1000
        });
        //等待1秒后执行
        setTimeout(() => {
          this.setData({
            showCenterDialog: !this.data.showCenterDialog
          });
        }, 1000);
      },
      //点击关闭窗口
      onClickdiaCenterView: function () {
        this.setData({
          showCenterDialog: !this.data.showCenterDialog
        });
      },
      valueSix(e) {
        var pwd=e.detail;
        console.log(e.detail);
        // 模态交互效果
        if(pwd=='123654')
        {
          //密码输入正确事件处理
         
          this.onClickdiaCenterView();
          request({method: "POST", data:this.data.cart,url: "/order/test" })
          .then(result => {
            console.log(result.data);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            });
          })
        }
        else{
          wx.showToast({
             //密码输入错误事件处理
            title: '密码错误',
            icon: 'none',
            duration: 2000
          });
        }
      }

      })