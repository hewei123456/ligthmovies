//获取应用实例
const app = getApp();
const utils = require('../../utils/util.js');
const requests = require('../../utils/requests.js');
import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
  },

  /**
   * methods
   */

  // 手机登陆
  async signin() {
    try {
      var response = await requests.login('13439093625', 'aijiangfen65813');
      wx.setStorageSync('token', response.data.token);
      this.getUserinfo();
    } catch (error) {
      console.log(error);
    }
  },

  // 从后台获取用户信息  
  async getUserinfo() {
    try {
      await requests.getUserinfo();
      wx.switchTab({
        url: '/pages/main/main',
        success(e) {
          var page = getCurrentPages().pop();
          if (!page)
            return;
          page.onLoad();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
})