// 获取用户收获地址
/* 1绑定点击事件
   2调用api 获取用户收获地址

  现在新的接口不需要判断scope.address https://developers.weixin.qq.com/community/develop/doc/000c0a0a590490590d0ba0c3d51801
   
  */
import regeneratorruntime from '../../lib/runtime/runtime';
Page({
  /**
   * 点击按钮事件
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  handleChooseAddress() {
    wx.chooseAddress({
      success: (address) => {
        address.allAddress = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync("address", address);
      }
    });
  },
  //商品选中
  handleItemChange(e) {
    //获取点击商品id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {
      cart
    } = this.data;
    //找到被修的的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //修改状态
    cart[index].IsChecked = !cart[index].IsChecked;
    // end 把购物车数据重新设置贵打他中和缓存中
    this.setCart(cart);


  },
  //设置购物车状态 重新计算数据
  setCart(cart) {

    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.IsChecked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("Cart", cart);
  },
  handleItemAllCheck() {
    //获取data中的数据
    let {
      cart,
      allChecked
    } = this.data;
    //修改值
    allChecked = !allChecked;
    //修改数组
    cart.forEach(v => v.IsChecked = allChecked);
    //把修改后的数据
    this.setCart(cart);

  },
  async handlePay() {
    const {
      address,
      totalNum
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
   else if (totalNum === 0) {
      wx.showToast({
        title: '未选择商品或购物车为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result) => {
          console.log(totalNum);

        }
      });
    }
else{
 //跳转支付界面
 wx.navigateTo({
  url: '/pages/pay/pay'

});
}
   
    



  },
  //商品数量编辑
  async handleItemNumEdit(e) {
    //1 获取操作参数
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    //获取购物车数组
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '是否删除此商品？',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1); //删除对象
            this.setCart(cart);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      cart[index].num += operation;
      //设置到缓存和data中
      this.setCart(cart);
    }

  },
  //onLoad onShow

  onShow() {
    //获取缓存中的地址
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart = wx.getStorageSync("Cart") || [];
    this.setData({
      address
    });
    this.setCart(cart);
  }


})