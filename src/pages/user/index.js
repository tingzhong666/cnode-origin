const app = getApp()

Page({
  data: {
    logined: false,
    userInfo: null,
    collect: null
  },

  onLoad () {
    const { logined } = app.globalData
    if (logined) {
      this.init()
    } else {
      this.setData({
        list: [
          {
            page: '/pages/list/index',
            query: {
              imgshow: 'false',
              label: '创建的主题',
              fonticon: 'iconfont icon-huati',
            },
            fonticon: 'iconfont icon-huati',
            label: '创建的主题',
            n: -1
          },
          {
            page: '/pages/list/index',
            query: {
              imgshow: 'true',
              label: '参于的主题',
              fonticon: 'iconfont icon-canyu',
            },
            fonticon: 'iconfont icon-canyu',
            label: '参于的主题',
            n: -1
          },
          {
            page: '/pages/list/index',
            query: {
              imgshow: 'true',
              label: '收藏的主题',
              fonticon: 'iconfont icon-shoucang2',
            },
            fonticon: 'iconfont icon-shoucang2',
            label: '收藏的主题',
            n: -1
          },
          {
            page: '/pages/about/index',
            query: {},
            fonticon: 'iconfont icon-guanyu',
            label: '关于',
            n: -1
          },
        ]
      })
    }
  },

  // 登录数据
  init () {
    const { userInfo, collect } = app.globalData
    this.setData({
      logined: true,
      userInfo,
      collect,
      list: [
        {
          page: '/pages/list/index',
          query: {
            imgshow: 'false',
            label: '创建的主题',
            fonticon: 'iconfont icon-huati',
            name: userInfo.loginname
        },
          fonticon: 'iconfont icon-huati',
          label: '创建的主题',
          n: userInfo.recent_topics.length
        },
        {
          page: '/pages/list/index',
          query: {
            imgshow: 'true',
            label: '参于的主题',
            fonticon: 'iconfont icon-canyu',
            name: userInfo.loginname
          },
          fonticon: 'iconfont icon-canyu',
          label: '参于的主题',
          n: userInfo.recent_replies.length
        },
        {
          page: '/pages/list/index',
          query: {
            imgshow: 'true',
            label: '收藏的主题',
            fonticon: 'iconfont icon-shoucang2',
            name: userInfo.loginname
          },
          fonticon: 'iconfont icon-shoucang2',
          label: '收藏的主题',
          n: collect.length
        },
        {
          page: '/pages/about/index',
          query: {},
          fonticon: 'iconfont icon-guanyu',
          label: '关于',
          n: -1
        },
      ]
    })
  },

  // 登录页面
  login () {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },

  // 点击去往页面
  click (e) {
    const { page, query, label } = e.detail
    if (!this.data.logined && label !== '关于') {
      // 未登录
      wx.showModal({
        title: '提示',
        content: '未登录',
        showCancel: false
      })
      return
    }
    let q = ''
    for (let key in query) {
      q += `${key}=${query[key]}&`
    }
    wx.navigateTo({
      url: page + '?' + q
    })
  },

  // 退出登录
  logout () {
    wx.clearStorageSync()
    app.clear()
    wx.reLaunch({
      url: '/pages/user/index'
    })
  }

})