import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    type: '',
    start: 0,
    count: 3
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
    this.getMovieDetail();
  },

  /**
   * methods
   */
  async searchMovies() {
    try {
      var response = await requests.searchMovies(this.data.keywords);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  async filterMovies() {
    try {
      var response = await requests.filterMovies(this.data.start, this.data.count, this.data.type);
      console.log(response); 
    } catch (error) {
      console.log(error);
    }
  }, 

  async getMovieDetail() {
    try {
      var response = await requests.getMovieDetail(326);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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

  }
});