import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.searchMovies();
  },

  /**
   * methods
   */
  async searchMovies() {
    try {
      var
        response = await requests.searchMovies(this.data.keywords),
        movies = utils.handleData(response.data.results.subjects);
      this.setData({
        movies
      });
    } catch (error) {
      console.log(error);
    }
  },

  onBindConfirm(event) {
    this.setData({
      keywords: event.detail.value
    });
    this.searchMovies();
  }
});