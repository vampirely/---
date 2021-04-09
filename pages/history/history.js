// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
historyObj:[]
  },

 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const history = wx.getStorageSync("history");
    this.setData({
      historyObj: history
    })
  },
  handleHistoryCancel(e){
      var current = e.currentTarget.dataset.index;
      var list=this.data.historyObj;
      list.splice(current,1)
      wx.setStorageSync("history",list);
      this.setData({
        historyObj: list
      })
      wx.showToast({
        title: '已删除',
        icon: 'none',
        image: '',
        duration: 500,
        mask: true 
      });
    },
    //清空列表
    handleClearAll(){
    
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
              wx.removeStorageSync("history");
              this.setData({
                historyObj: []
              })
            }
          }
        });
      
     
    }
 
})