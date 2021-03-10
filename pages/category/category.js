// pages/category/category.js
import regeneratorruntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧菜单数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0,
    //右侧内容的滚动条离顶部距离
    scrollTop: 0
  },
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1先判断一下本地储存中有没有旧的数据
    {time：Date.now(),data[...]}
    2没有旧数据直接发送新的请求
    有旧数据，同时旧数据没过期，就使用本地旧数据即可
    */
    //1获取本地存储的数据，小程序中也是存在本地存储技术的
    const Cates = wx.getStorageSync("cates");
    //2判断
    if (!Cates) { //不存在发送请求数据
      this.getCates();
    } else {
      //有旧的数据 判断有没有过期 暂时定义过期时间10是改成5min
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新请求
        this.getCates();
      } else {
        //可以使用旧数据
        //console.log("可以使用旧数据")
        this.Cates = Cates.data;
        //构造左侧菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        //构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCates() {
    // request({
    //     url: "/categories"
    //   })
    //   .then(res => {

    //     this.Cates = res.data.message;
    //     //把接口的数据存入到本地储存中
    //     wx.setStorageSync("cates", {
    //       time: Date.now(),
    //       data: this.Cates
    //     });

    //     //构造左侧菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     //构造右侧商品数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })
    const res = await request({
      url: "/categories"
    });
    this.Cates = res.data.message;
    //把接口的数据存入到本地储存中
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates
    });

    //构造左侧菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧点击事件
  handleItemTap(e) {
    // 1获取被点击标题十五索引，
    // 2给data的currentIndex赋值
    //3根据索引渲染所需要的数据
    const {
      index
    } = e.currentTarget.dataset; //const声明一个只读的常量。一旦声明，常量的值就不能改变。

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }

})