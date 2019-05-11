const { getUser, getCollect } = require('../../utils/util')

Page({
  data: {
    list: null,
    imgshow: false,
    label: null,
    fonticon: null,
    show: false,
    loaded: false
  },

  onLoad (query) {
    this.init(query)
  },

  // 初始化数据
  init (query) {
      const {  label, fonticon, name } = query

      switch (label) {
        case '创建的主题':
          getUser(name)
            .then(res => {
              this.setData({
                list: res.recent_topics,
                loaded: true
              })
            })
          break
        case '参于的主题':
          getUser(name)
            .then(res => {
              this.setData({
                list: res.recent_replies,
                loaded: true
              })
            })
          break
        case '收藏的主题':
          getCollect(name)
            .then(res => {
              this.setData({
                list: res,
                loaded: true
              })
            })
          break
      }

    this.setData({
      fonticon,
      label
    })
    wx.setNavigationBarTitle({
      title: label
    })
  },

  // 加载完成
  ok () {
    this.setData({
      show: true
    })
  },

  // 用户中心
  user (e) {
    const name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/userinfo/index?userName=' + name
    })
  },

  // 主题详情
  topic (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/topic/index?id=' + id
    })
  }

})