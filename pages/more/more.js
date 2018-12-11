import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    count: 20,
    isEmpty: false,
    type: null,
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = options.type;
    this.setData({
      type
    });
    this.filterMovies();
  },

  /**
   * methods
   */
  async filterMovies() {
    try {
      var
        response = await requests.filterMovies(this.data.start, this.data.count, this.data.type),
        results = response.data.results;
      console.log(response);
      if (results.count < 20)
        this.setData({
          isEmpty: true
        });
      else
        this.setData({
          start: results.count
        });
      var movies = utils.handleData(results.subjects);
      this.setData({
        movies: this.data.movies.concat(movies)
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.isEmpty) {
      this.filterMovies();
    }
  },
});