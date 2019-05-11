const { time } = require('../../utils/util')

Component({
  properties: {
    info: {
      type: Object,
      value: null
    },
    imgshow: {
      type: Boolean,
      value: true
    },
    tabshow: {
      type: Boolean,
      value: true
    }
  },

  data: {
    item: null
  },

  attached () {
    this.setData({
      item: this.handle(this.data.info)
    })
  },

  methods: {
    // 头像点击
    authorTap (e) {
      let userName = e.currentTarget.dataset.userName
      wx.navigateTo({
        url: '/pages/userinfo/index?userName=' + userName
      })
    },

    // 标题点击
    infoTap (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/topic/index?id=' + id
      })
    },

    // 处理
    handle (data) {
      // 最后创建时间处理
      data.create_at = time(data.create_at)

      // 分类图标处理
      switch (data.tab) {
        case 'share':
          data.tab  ='分享'
          break
        case 'job':
          data.tab  ='招聘'
          break
        case 'ask':
          data.tab  ='问答'
          break
      }

      // 图标显示样式
      data.tab = data.top ? '置顶' : data.good ? '精华' : data.tab
      data.green = data.top || data.good ? true :  false

      return data
    }

  }
})