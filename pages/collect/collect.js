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
  handleCollectCancel(e) {
    var current = e.currentTarget.dataset.index;
    var list = this.data.collectObj;
    list.splice(current, 1)
    wx.setStorageSync("collect", list);
    this.setData({
      collectObj: list
    })
    wx.showToast({
      title: '已取消',
      icon: 'none',
      image: '',
      duration: 500,
      mask: true
    });
  },
  //清空列表
  handleClearAll() {
    wx.showModal({
      title: '是否清空列表？',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          wx.removeStorageSync("collect");
          this.setData({
            collectObj: []
          })
        }
      }
    });


  }
})