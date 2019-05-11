const { apis } = require('../../config'),
  app = getApp()

Page({
  data: {
    md: null,
    loaded: false,
    top: false
  },
  onLoad () {
    this.get()
  },

  // 获取数据
  get () {
    const r = /<div class\=\"markdown.*?<\/div>/
    wx.request({
      url: apis,
      success: res => {
        let data = res.data.replace(/\n/g, '')
        data = data.match(r)[0]
        this.setData({
          md: app.towxml(data),
          loaded: true
        })
      }
    })
  },

  // 监听滚动
  onPageScroll (e) {
    if (e.scrollTop > 300 && !this.data.top) {
      this.setData({
        top: true
      })
    }
    if (e.scrollTop < 300 && this.data.top) {
      this.setData({
        top: false
      })
    }
  }
})