const token = ' d18bb04b1aaa35197a064372b345210afa4a9714';
// const baseUrl = 'http://47.94.214.83:3000/api/';
const baseUrl = 'http://127.0.0.1:3000/api/';

const articlesApi = baseUrl + 'articles';

const http = (url, data, method) => {
  wx.showLoading({
    title: '加载中...'
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: {
        'Authorization': `Token ${token}`
      },
      method,
      success(response) {
        resolve(response);
      },
      fail(error) {
        reject(error);
      },
      complete() {
        wx.hideLoading();
      }
    });
  })
};

const getData = () => {
  return http(articlesApi, {}, 'GET');
};
module.exports = {
  getData
};