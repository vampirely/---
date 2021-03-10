// pages/goods_detail/goods_detail.js
/* 1  发送请求获取数据
   2 点击轮播图预查看大图
   3 加入购物车  
    1 绑定点击事件
    2 获取缓存中的购物车数据 数组格式
    3 先判断当前商品是否已存在于购物车
    4 已存在执行数量++
 */
import regeneratorruntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  goodsInfo: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id;
    this.getGoodDetail(goods_id);
  },
  //获取商品的详细数据
  async getGoodDetail(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.goodsInfo = res.data.message;
    console.log(this.goodsInfo);
    this.setData({
      goodsObj: res.data.message
    })
  },
  //点击图片调用api
  handlePreviewImage(e) {
    const image_urls = this.goodsInfo.pics.map(v => v.pics_big);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: image_urls

    });

  },
  //加入购物车
  handleCartAdd(){
   /* 获取缓存中的购物车数组 */
  /*  data = data || [];
   易点的写法应该是这样吧 data = data ? data : []; */
   let  cart = wx.getStorageSync("Cart")||[];

   //判断商品对象是否存在于购物车数组中\
   let index=cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
   if(index===-1){
     //不存在 第一次添加
     this.goodsInfo.num=1;//手动添加的数据
     this.goodsInfo.IsChecked=true;
     cart.push(this.goodsInfo);


   }else{
     //已经存在购物车数据 num++
     cart[index].num++;
   }
   wx.setStorageSync("Cart", cart);
     
   wx.showToast({
     title: '加入成功',
     icon: 'success',
     mask: true
   });
     


     
  }

})