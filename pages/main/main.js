import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    swiperIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getArticles();
  },

  /**
   * methods
   */

  // 获取文章列表 
  async getArticles() {
    try {
      var response = await requests.getArticles();
      var articles = response.data.articles;
      articles.forEach(item => {
        item.avatar = utils.handlePath(item.avatar);
        item.imgSrc = utils.handlePath(item.imgSrc);
        item.date = utils.formatTime(item.createdAt);
      });
      this.setData({
        articles
      });
    } catch (error) {
      console.log(error);
    }
  },

  onSwiperTap() {
    wx.navigateTo({
      url: '/pages/detail/detail?articleId=' + this.data.articles[this.data.swiperIndex].id
    });
  },

  // 显示ActionSheet
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
  }
});