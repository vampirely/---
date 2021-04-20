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
    goodsObj: {},
    goodsDetailPics: [],
    isCollect: false,
    loading: true,
    imgloading:0
  },
  goodsInfo: [],
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  //   const goods_id = options.goods_id; //从详细页面获取传送来的商品id
  //   this.getGoodDetail(goods_id);
  // },
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      goods_id
    } = options;
    this.getGoodDetail(goods_id);
    this.getDetailPics(goods_id);



  },
  //获取商品的详细数据
  async getGoodDetail(goods_id) {
    const res = await request({
      url: "/goodsDetail",
      data: {
        goods_id
      }
    });
    this.goodsInfo = res.data.message;
    //获取缓存中的收藏
    let collect = wx.getStorageSync("collect") || [];
    let history = wx.getStorageSync("history") || [];
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id);
    this.setData({
      goodsObj: res.data.message,
      isCollect,
      loading: false
    })
    history.push(this.goodsInfo);
    wx.setStorageSync("history", history);
  },
  //获取商品的图文详情
  async getDetailPics(goods_id) {
    const res = await request({
      url: "/DetailPics",
      data: {
        goods_id
      }
    });
    this.setData({
      goodsDetailPics: res.data.message.detail_pics,
    })
  },
  //点击图片调用api
  handlePreviewImage(e) {
    const image_urls = this.goodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      urls: image_urls

    });

  },
  //加入购物车
  handleCartAdd() {
    /* 获取缓存中的购物车数组 */
    /*  data = data || [];
     这样 data = data ? data : []; */
    let cart = wx.getStorageSync("Cart") || [];

    //判断商品对象是否存在于购物车数组中\
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      //不存在 第一次添加
      this.goodsInfo.num = 1; //手动添加的数据
      this.goodsInfo.IsChecked = true;
      cart.push(this.goodsInfo);


    } else {
      //已经存在购物车数据 num++
      cart[index].num++;
    }
    wx.setStorageSync("Cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });




  }, //商品收藏
  handleCollect() {
    let isCollect = false;
    //获取缓存中的收藏
    let collect = wx.getStorageSync("collect") || [];
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    //idnex!=-1 表示收藏过了
    if (index != -1) {
      collect.splice(index, 1) //删除数组中的收藏
      isCollect = false;
      wx.showToast({
        title: '取消收藏',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true
      });

    } else {
      collect.push(this.goodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true
      });
    }
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
    });
  },
  //立即购买
  handlePayNow() {
    // let paynowgoods = wx.getStorageSync("goodNow") || [];
    // wx.setStorageSync("goodsNow", [])
    // paynowgoods.push(this.goodsInfo);
    wx.setStorageSync("goodsNow", this.goodsInfo);
    wx.navigateTo({
      url: '/pages/paynow/paynow',
      success: (result) => {},
      fail: () => {},
      complete: () => {}
    });

  },
  handleImgLoad() {
    this.data.imgloading++;
    if(this.data.imgloading===this.data.goodsDetailPics.length)
    {
      this.setData({imgloading:this.data.imgloading})
    }
  }
})