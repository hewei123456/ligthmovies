import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'
const requests = require('../../utils/requests.js');
const utils = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var movieId = parseInt(options.movieId);
    this.getMovieDetail(movieId);
  },

  /**
   * methods
   */
  async getMovieDetail(id) {
    try {
      var res = await requests.getMovieDetail(id);
      console.log(res);
      var data = res.data.results;
      if (!data) {
        return;
      }
      var director = {
        avatar: "",
        name: "",
        id: ""
      }
      if (data.directors[0] != null) {
        if (data.directors[0].avatars != null) {
          director.avatar = data.directors[0].avatars.large
        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
      };
      var movie = {
        movieImg: data.images ? data.images.large : '',
        country: data.countries[0],
        title: data.title,
        originalTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comments_count,
        year: data.year,
        generes: data.genres.join('、'),
        stars: utils.convertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: utils.convertToCastString(data.casts),
        castsInfo: utils.convertToCastInfos(data.casts),
        summary: data.summary ? `<span class='summary-content'>${utils.return2Br(data.summary)}</span>` : `<span class='summary-content'>暂无...</span>`
      };
      this.setData({
        movie
      });
      console.log(this.data.movie)
    } catch (error) {
      console.log(error);
    }
  }
});