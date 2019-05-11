const app = getApp()

Component({
  properties: {
    info: {
      type: Object,
      value: null
    }
  },

  data: {
    article: null
  },

  observers: {
    'info':function (info) {
      if (!info) return
      this.setData({
        article: app.towxml(info.content)
      })
    }
  },

  attached () {
  },

  methods: {
    // 点击头像，用户中心
    user (e) {
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: '/pages/userinfo/index?userName=' + name
      })
    }
  }

})