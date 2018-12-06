const token = '123456';
// const token = '123456';
// const baseUrl = 'https://hewei.picp.vip/api/';
const baseUrl = 'http://127.0.0.1:3000/api/';

const articlesApi = baseUrl + 'userInfo';
const loginApi = baseUrl + 'login';

const http = (url, data, method) => {
  wx.showLoading({
    title: '加载中...'
  });
  // var token;
  // try {
  //   token = wx.getStorageSync('token');
  // } catch (error) { 
  //   console.log(error);
  // }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: {
        'Authorization': `JWT ${token}`
      },
      method,
      success(response) {
        // switch (response.statusCode) {
        //   case 401:
        //     console.log('您没有登录');
        //     wx.navigateTo({
        //       url: '/pages/index/index'
        //     });
        //     break;
        //   case 403:
        //     console.log('您没有该操作权限');
        //     break;
        //   case 500:
        //     console.log('服务器错误');
        //     break;
        //   default:
        //     resolve(response);
        // }
        resolve(response);

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

const login = (username, password) => {
  return http(loginApi, {
    username,
    password
  }, 'POST');
};

const getData = () => {
  return http(articlesApi, {}, 'GET');
};

module.exports = { 
  baseUrl,
  login,
  getData
};