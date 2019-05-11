const { time } = require('../../utils/util'),
  app = getApp()

Component({
  properties: {
    comments: {
      type: Array,
      value: []
    }
  },

  data: {
    not: false
  },

  observers: {
    'comments': function (v) {
      this.setData({
        not: !v.length
      })
    }
  },

  attached () {
    this.handle()
  },

  methods: {
    // 数据处理
    handle () {
      let data = this.data.comments
      let datas= []
      data.forEach((item, index) => {
        // 时间
        item.create_at = time(item.create_at)
        // 楼
        item.n = index + 1
        // 内容转换
        item.content = app.towxml(item.content)
        // 倒序排列
        datas.unshift(item)
      })

      this.setData({
        comments: datas
      })
    },

    // 点赞
    like () {
      wx.showModal({
        title: '提示',
        content: '官方没有开放点赞API，所以无法点赞',
        showCancel: false
      })
    },

    // 点击头像，用户中心
    user (e) {
      const name = e.currentTarget.dataset.name
      wx.navigateTo({
        url: '/pages/userinfo/index?userName=' + name
      })
    }
  }

})