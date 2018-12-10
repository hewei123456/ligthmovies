const requests = require('./requests.js')

const formatTime = timestamp => {
  var date = new Date(timestamp);
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

const subStrByDigits = (str, digits) => {
  var strNew = str;
  if (strNew.length > digits) {
    strNew = strNew.substring(0, digits) + '...';
  }
  return strNew;
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

const handlePath = (path) => {
  var [base] = requests.baseUrl.split('/api/');
  return base + path.slice(1);
};

module.exports = {
  formatTime,
  subStrByDigits,
  getUserInfo,
  handlePath
}