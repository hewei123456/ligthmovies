Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * methods
   */
  logout() {
    wx.clearStorageSync();
    wx.redirectTo({
      url: '/pages/index/index'
    });
  }
});