import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserinfo();
    this.getArticles();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * methods
   */
  handleClick() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    });
  },
  async getUserinfo() {
    try {
      var response = await requests.getUserinfo();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  async getArticles() {
    try {
      var response = await requests.getArticles();
      console.log(response);
      var articles = response.data.articles;
      articles.forEach(item => {
        item.avatar = utils.handlePicPath(requests.baseUrl, item.avatar);
        item.imgSrc = utils.handlePicPath(requests.baseUrl, item.imgSrc);
      });
      this.setData({
        articles
      });
    } catch (error) {
      console.log(error);
    }
  }
});