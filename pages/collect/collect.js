Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectObj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const collect = wx.getStorageSync("collect");
    this.setData({
      collectObj: collect
    })
  }

 ,
 handleCollectCancel(){
   console.log("my");
 }
})

