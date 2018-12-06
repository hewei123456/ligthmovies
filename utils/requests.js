// const baseUrl = 'https://hewei.picp.vip/api/';
const baseUrl = 'http://127.0.0.1:3000/api/';

const loginApi = baseUrl + 'signin';
const userinfoApi = baseUrl + 'userinfo';
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
        'Authorization': `Bearer ${wx.getStorageSync('token')}`
      },
      method,
      success(response) {
        switch (response.statusCode) {
          case 401:
            console.log('您没有登录');
            wx.navigateTo({
              url: '/pages/index/index'
            });
            break;
          case 403:
            console.log('您没有该操作权限');
            break;
          case 500:
            console.log('服务器错误');
            break;
          default:
            resolve(response);
        }
      },
      fail(error) {
        reject(error);
      },
      complete() {
        wx.hideLoading();
      }
    });
  });
};

const login = (email, passwd) => {
  return http(loginApi, {
    email,
    passwd
  }, 'POST');
};

const getUserinfo = () => {
  return http(userinfoApi, {}, 'GET');
};

const getArticles = () => {
  return http(articlesApi, {}, 'GET');
};

module.exports = {
  baseUrl,
  login,
  getUserinfo,
  getArticles
};