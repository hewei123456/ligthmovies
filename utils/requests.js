const token = ' d18bb04b1aaa35197a064372b345210afa4a9714';
const baseUrl = 'http://127.0.0.1:3000/api/';


const productsApi = baseUrl + 'articles';

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

const getData = () => {
  return http(productsApi, {}, 'GET');
};
module.exports = {
  getData
};