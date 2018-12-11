import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    count: 3,
    moviesList: []
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
    this.filterMovies();
  },

  /**
   * methods
   */
  async filterMovies() {
    try {
      var response = await requests.filterMovies(this.data.start, this.data.count),
        {
          comingSoon,
          inTheater,
          top250
        } = response.data.results;
      var moviesList = [{
        title: '正在热映',
        type: 'inTheater',
        data: utils.handleData(inTheater)
      }, {
        title: '即将上映',
        type: 'comingSoon',
        data: utils.handleData(comingSoon)
      }, {
        title: '豆瓣top250',
        type: 'comingSoon',
        data: utils.handleData(top250)
      }];
      this.setData({
        moviesList
      });
      console.log(this.data.moviesList);
    } catch (error) {
      console.log(error);
    }
  },

  jumpToMore(event) {
    var type = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/more/more?type=' + type,
    });
  },

  jumpToSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    });
  }
});