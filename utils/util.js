const requests = require('./requests.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const getUserInfo = (app) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: response => {
        app.globalData.userInfo = response.userInfo;
        resolve(response);
      },
      fail: error => {
        reject(error);
      }
    });
  });
};

const handlePicPath = (path) => {
  var [base] = requests.baseUrl.split('/api/');
  return base + path.slice(1);
};

module.exports = {
  formatTime,
  getUserInfo,
  handlePicPath
}