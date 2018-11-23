const token = ' d18bb04b1aaa35197a064372b345210afa4a9714';
const baseUrl = 'http://47.94.214.83:8000/';


const goodsApi = baseUrl + 'goods';

const http = (url, func, funcerr) => {
  // let new Promise()
  wx.request({
    url: url,
    data: {},
    header: {
      'Authorization': `Token ${token}`
    },
    method: 'GET',
    success(res) {
      func(res);
    },
    fail(err) {
      console.log(err);
      funcerr(err);
    }
  });
};

const getGoods = (url) => {
  http(goodsApi, data => {
    console.log(data);
  }, err => {

  });
};

module.exports = {
  getGoods: getGoods
};