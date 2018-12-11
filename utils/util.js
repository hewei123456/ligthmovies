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

const handleData = (data) => {
  var list = [];
  data.forEach(item => {
    list.push({
      cover: item.images.large,
      rating: item.rating.average,
      stars: convertToStarsArray(item.rating.stars),
      title: subStrByDigits(item.title, 7),
      id: item.id
    });
  });
  return list;
};

const handlePath = (path) => {
  var [base] = requests.baseUrl.split('/api/');
  return base + path.slice(1);
};

const convertToStarsArray = (stars) => {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num)
      array.push(1);
    else
      array.push(0);
  }
  return array
};

const convertToCastString = (casts) => {
  var castsjoin = '';
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + ' / '
  }
  return castsjoin.substring(0, castsjoin.length - 2)
};

const convertToCastInfos = (casts) => {
  var castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : '',
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray
};

const return2Br = (str) => {
  return str.replace(/\\n/g, '<br />');
};

module.exports = {
  formatTime,
  subStrByDigits,
  getUserInfo,
  handlePath,
  handleData,
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos,
  return2Br
}