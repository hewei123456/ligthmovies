Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleId: {
      type: String,
      value: ''
    },

    title: {
      type: String,
      value: ''
    },

    avatar: {
      type: String,
      value: '/images/avatar.jpg'
    },

    imgSrc: {
      type: String,
      value: ''
    },

    brief: {
      type: String,
      value: ''
    },

    collection: {
      type: Number,
      value: 0
    },

    reading: {
      type: Number,
      value: 0
    },

    date: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onJumpTap() {
      wx.navigateTo({
        url: '/pages/detail/detail?articleId=' + this.data.articleId
      });
    }
  }
});