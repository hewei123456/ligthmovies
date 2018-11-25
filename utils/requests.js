const token = ' d18bb04b1aaa35197a064372b345210afa4a9714';
const baseUrl = 'http://47.94.214.83:8000/';


const goodsApi = baseUrl + 'goods';

const http = (url, data, method) => {
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
      }
    });
  })
};

const getGoods = () => {
  return http(goodsApi, {}, 'GET');
};

module.exports = {
  getGoods
};