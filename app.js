const utils = require('./utils/util.js');

App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: response => {
        console.log(response);
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: response => {
        if (response.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          utils.getUserInfo(this).then(response => {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回，所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback)
              this.userInfoReadyCallback(response);
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
});