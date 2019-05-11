const { topic, collect, deCollect } = require('../../config'),
  { time } = require('../../utils/util')

Page({
  data: {
    id: null,
    info: null,
    load: false,
    show: false,
    is_collect: false,
    top: false
  },

  onLoad (query) {
    this.setData({
      id: query.id
    })
    this.getTopic(this.data.id)
      .then(data => {
        data = this.handle(data)
        this.setData({
          info: data,
          load: true
        })
      })
  },

  // 请求数据
  getTopic (id) {
    return new Promise((resolve, reject) => {
      const url = topic + '/' + id
      wx.request({
        url,
        method: 'GET',
        data: {
          accesstoken: wx.getStorageSync('token')
        },
        success: res => {
          if (res.data.success) {
            resolve(res.data.data)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  // 响应数据处理
  handle (data) {
    // 时间处理
    data.create_at = time(data.create_at)
    data.last_reply_at = time(data.last_reply_at)

    // 分类处理
    switch (data.tab) {
      case 'job':
        data.tab = '招聘'
        break
      case 'share':
        data.tab = '分享'
        break
      case 'ask':
        data.tab = '问答'
        break
    }

    // 置顶精华标识处理
    data.badge = data.top || data.good ? true : false
    data.badgeT = data.good ? '精华' : data.top ? '置顶' : ''

    // 是否收藏
    this.setData({
      is_collect: data.is_collect
    })

    return data
  },

  // 加载条加载完成
  ok () {
    this.setData({
      show: true
    })
  },

  // 收藏事件
  collect () {
    const is_collect = !this.data.is_collect
    is_collect && this.addCollect()
    !is_collect && this.deCollect()
  },

  // 收藏主题
  addCollect () {
    wx.request({
      method: 'POST',
      url: collect,
      data: {
        accesstoken: wx.getStorageSync('token'),
        topic_id: this.data.id
      },
      success: res => {
        if (res.data.success) {
          this.setData({
            is_collect: true
          })
        }
      }
    })
  },

  // 取消收藏
  deCollect () {
    wx.request({
      method: 'POST',
      url: deCollect,
      data: {
        accesstoken: wx.getStorageSync('token'),
        topic_id: this.data.id
      },
      success: res => {
        if (res.data.success) {
          this.setData({
            is_collect: false
          })
        }
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