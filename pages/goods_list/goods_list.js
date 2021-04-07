/* 1用户上滑页面 滑动条触底 开始加载下一页数据 
  1 找到滚动条触底事件 
  2 如果有下一个数据 就架子啊下一页数据 灭有下一页数据 提示到底了
    1获取到总页数？ 只有总条数
      总页数=Math.ceil(总条数/总页量)
    2获取当前页码
    3判断一下当前页面是否大于等于 总页数
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
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }

    ],
    goodsList: [],
    loading:true

  },
  //接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;

    this.getGoodsList();
  },
  //页面触底事件
  onReachBottom: function () {
    //判断有没有下一页，
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '到底了',

      });

    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //刷新
  onPullDownRefresh: function () {
    //重置数组 页码 重新发送请求 再关闭等待效果
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
    
      
  },
  //获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goodsList",
      data: this.QueryParams
    });
    //获取总条数
    const total = res.data.message.total;
    //计算页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    //console.log(this.totalPages);
    this.setData({
      loading:false,
      goodsList: [...this.data.goodsList, ...res.data.message.goods] //拼接数组
    })
    //关闭下来刷新效果
    wx.stopPullDownRefresh();
  },
  handleTabsItemChange(e) {
    //获取被点击表体索引
    const {
      index
    } = e.detail
    //修改源数组
    let {
      tabs
    } = this.data;
    //const {item} = e.currentTarget.dataset等同于const item = e.currentTarget.dataset.item
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //赋值到data中
    this.setData({
      tabs
    })
  }
})