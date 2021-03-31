import {
  request
} from "../../request/index.js";
import regeneratorruntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: []
  },
  //接口要的参数
  QueryParams: {
    keyword: ""
  },

  handleSearch() {
    this.getGoodsList();
  },
  handleSearchValue(e) {
    this.QueryParams.keyword = e.detail.value;
  },
  async getGoodsList() {
    const res = await request({
      url: "/search",
      data: this.QueryParams
    });
    this.setData({
      goodList: res.data.message
    })
  }
})