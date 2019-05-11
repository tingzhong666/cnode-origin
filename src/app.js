const { accessToken, user, host, topicCollect } = require('./config'),
  Towxml = require('./lib/towxml/main'),
  { time, getMsgN } = require('./utils/util')

App({
  globalData: {
    userInfo: null,
    logined: false,
    name: null,
    collect: null
  },

  onLaunch: function () {
    this.check()
      .then(res => {
        if (!res) return
        this.globalData.userInfo.recent_topics = this.lastHandle(this.globalData.userInfo.recent_topics)
        this.globalData.userInfo.recent_replies = this.lastHandle(this.globalData.userInfo.recent_replies)
      })
  },

  // towxml
  towxml (data) {
    const to = new Towxml()
    data = to.toJson(data, 'html')
    data = to.initData(data, {
      base: host,
      app: this
    })
    data.theme = 'light'
    return data
  },

  // 验证 token
  check () {
    return new Promise((resolve, reject) => {
      if (!wx.getStorageSync('token')) return
      const token = wx.getStorageSync('token')
      wx.request({
        url: accessToken,
        method: 'POST',
        data: {
          accesstoken: token
        },
        success: res => {
          if (res.statusCode === 200) {
            this.globalData.userInfo = res.data
            this.globalData.logined = true
            this.globalData.name = res.data.loginname
            this.getUserInfo()
              .then(() => this.getCollec(this.globalData.name))
              .then(() => this.getMsgN(token))
              .then(() => resolve(true))
          } else {
            wx.clearStorageSync()
            this.clear()
            resolve(false)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  // 获取未读消息数
  getMsgN (token) {
    return new Promise((resolve, reject) => {
      getMsgN(token)
        .then(count => {
          if (count > 0) {
            wx.showTabBarRedDot({index: 3})
          } else {
            wx.hideTabBarRedDot({index: 3})
          }
          resolve()
        })
        .catch(err => reject(err))
    })
  },

  // 获取信息
  getUserInfo () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: user + '/' + this.globalData.name,
        method: 'GET',
        success: res => {
          this.globalData.userInfo = res.data.data
          resolve()
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  // 获取收藏的主题列表
  getCollec (userName) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'GET',
        url: topicCollect + '/' + userName,
        success: res => {
          this.globalData.collect = res.data.data
          resolve()
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  // 创建/参与 最后回复时间处理
  lastHandle (data) {
    return data.map(item => {
      item.last_reply_at = time(item.last_reply_at)
      return item
    })
  },

  // 清空数据
  clear () {
    this.globalData = {
      userInfo: null,
      logined: false,
      name: null
    }
  }

})