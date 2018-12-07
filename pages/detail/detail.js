//获取应用实例
const app = getApp();
const utils = require('../../utils/util.js');
const requests = require('../../utils/requests.js');
import regeneratorRuntime from '../../packages/regenerator-runtime/runtime.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    dict: {},
    isPlayingMusic: false,
    collected: true,
    collectionId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var articleId = options.articleId;
    this.getArticleDetail(articleId);
    this.setMusicMonitor();
  },

  /**
   * methods
   */

  // 收藏文章
  async onCollecTap() {
    try {
      var articleId = this.data.dict.id;
      var response = await requests.collectArticle(articleId);
      this.checkCollected();
    } catch (error) {
      console.log(error);
    } 
  },

  // 取消文章收藏
  async onCancelTap() { 
    try {
      var response = await requests.cancelCollection(this.data.collectionId);
      this.checkCollected();
    } catch (error) {
      console.log(error);
    }
  },

  // 判断文章是否收藏
  async checkCollected() {
    try {
      var
        articleId = this.data.dict.id,
        response = await requests.checkCollected(articleId);
      this.setData({
        collected: response.data.collected,
        collectionId: response.data.id ? response.data.id : null
      });
    } catch (error) {
      console.log(error);
    }
  },

  // 获取文章详细信息
  async getArticleDetail(articleId) {
    try {
      var response = await requests.getArticleDetail(articleId);
      response.data.avatar = utils.handlePicPath(response.data.avatar);
      response.data.imgSrc = utils.handlePicPath(response.data.imgSrc);
      this.setData({
        dict: response.data
      });
      if (app.globalData.isPlayingMusic && app.globalData.musicId === this.data.dict.musicId)
        this.setData({
          isPlayingMusic: true
        });
      else
        this.setData({
          isPlayingMusic: false
        });
      this.checkCollected();
    } catch (error) {
      console.log(error);
    }
  },

  // 监听全局音乐播放状态 
  setMusicMonitor() {
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(() => {
      app.globalData.isPlayingMusic = true;
      if (app.globalData.musicId != this.data.dict.musicId) {
        return
      }
      this.setData({
        isPlayingMusic: true
      });
    });
    backgroundAudioManager.onPause(() => {
      app.globalData.isPlayingMusic = false;
      if (app.globalData.musicId != this.data.dict.musicId) {
        return
      }
      this.setData({
        isPlayingMusic: false
      });
    });
    backgroundAudioManager.onStop(() => {
      app.globalData.isPlayingMusic = false;
      app.globalData.musicId = null;
      this.setData({
        isPlayingMusic: false
      });
    });
  },

  // 切换音乐 播放-暂停
  onMusicTap(event) {
    var
      music = this.data.dict.music,
      backgroundAudioManager = wx.getBackgroundAudioManager();
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic)
      backgroundAudioManager.pause();
    else {
      app.globalData.musicId = this.data.dict.musicId;
      backgroundAudioManager.title = music.title;
      backgroundAudioManager.epname = music.title;
      backgroundAudioManager.singer = music.author ? music.author : '未知';
      backgroundAudioManager.coverImgUrl = utils.handlePicPath(music.coverImg);
      backgroundAudioManager.src = music.url;
      backgroundAudioManager.play();
    }
  }
});