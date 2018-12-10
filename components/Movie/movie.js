// components/movie/movie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movieId: {
      type: String,
      value: ''
    },

    title: {
      type: String,
      value: ''
    },

    cover: {
      type: String,
      value: '/images/avatar.jpg'
    },

    stars: {
      type: Number,
      value: 0
    },

    rating: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})