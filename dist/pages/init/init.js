Page({
  data: {
    top: 0,
    $: null
  },

  onLoad: function () {
    const { windowHeight, statusBarHeight } = wx.getSystemInfoSync()
    const query =  wx.createSelectorQuery()

    query
      .select('.img').fields({
        size: true
      }, res => {
        this.setData({
          top: windowHeight / 2 - res.height / 2 - statusBarHeight
        })
      })
      .exec()

    const t = setTimeout(() => {
      wx.switchTab({
        url: '/pages/index/index'
      })
      clearTimeout(t)
    }, 2500)
  }
})