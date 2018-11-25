//index.js
//获取应用实例
const app = getApp();
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap() {
    requests.getGoods().then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = response => {
        this.setData({
          userInfo: response.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      utils.getUserInfo(app).then(response => {
        this.setData({
          userInfo: response.userInfo,
          hasUserInfo: true
        });
      });
    }
  },
  getUserInfo: function(response) {
    console.log(1)
    console.log(response);
    app.globalData.userInfo = response.detail.userInfo;
    this.setData({
      userInfo: response.detail.userInfo,
      hasUserInfo: true
    });
  }
})