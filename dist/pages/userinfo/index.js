const { getUser, getCollect } = require('../../utils/util')

Page({
  data: {
    userInfo: null,
    loaded: false,
    show: false
  },

  onLoad (query) {
    const { userName } = query

    Promise.all([getUser(userName), getCollect(userName)])
      .then(res => {
        this.setData({
          userInfo: res[0],
          collect: res[1],
          loaded: true
        })
        this.init()
      })
  },

  // 功能列表
  init () {
    let list = [
      {
        page: '/pages/list/index',
        query: {
          imgshow: 'false',
          label: '创建的主题',
          fonticon: 'iconfont icon-huati',
          name: this.data.userInfo.loginname
        },
        fonticon: 'iconfont icon-huati',
        label: '创建的主题',
        n: this.data.userInfo.recent_topics.length
      },
      {
        page: '/pages/list/index',
        query: {
          imgshow: 'true',
          label: '参于的主题',
          fonticon: 'iconfont icon-canyu',
          name: this.data.userInfo.loginname
        },
        fonticon: 'iconfont icon-canyu',
        label: '参于的主题',
        n: this.data.userInfo.recent_replies.length
      },
      {
        page: '/pages/list/index',
        query: {
          imgshow: 'true',
          label: '收藏的主题',
          fonticon: 'iconfont icon-shoucang2',
          name: this.data.userInfo.loginname
        },
        fonticon: 'iconfont icon-shoucang2',
        label: '收藏的主题',
        n: this.data.collect.length
      }
    ]

    this.setData({
      list
    })
  },

  // 加载完成
  ok () {
    this.setData({
      show: true
    })
  },

  // 功能列表点击路由
  click (e) {
    const { page, query, label } = e.detail
    let q = ''
    for (let key in query) {
      q += `${key}=${query[key]}&`
    }
    wx.navigateTo({
      url: page + '?' + q
    })
  }

})