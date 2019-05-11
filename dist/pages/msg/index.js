const app = getApp(),
  { getMsg }  = require('../../utils/util'),
  { markAll, markOne } = require('../../config')

Page({
  data: {
    logined: false,
    already: [],
    not: []
  },
  onLoad () {
    this.setData({
      logined: app.globalData.logined
    })
    this.data.logined && this.get()
  },

  // 获取数据
  get () {
    getMsg(wx.getStorageSync('token'))
    .then(res => {
      this.setData({
        already: res[0],
        not: res[1]
      })
    })
  },

  // 点击去往话题
  click (e) {
    const { not, id } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/topic/index?id=' + id,
      success: () => {
        // 如果是未读消息，则标记为已读
        not && this.not
      }
    })
  },

  // 标记单个消息为已读
  mark () {
    wx.request({
      url: markOne,
      method: 'POST',
      data: {
        accesstoken: wx.getStorageSync('token')
      },
      success: res => {
        // 刷新未读消息数
        app.getMsgN()
        // 刷新已读/未读数据
        this.get()
      }
    })
  },

  // 全部标记为已读
  markAll () {
    if (!this.data.not.length) {
      wx.showModal({
        title: '提示',
        content: '没有未读的消息',
        showCancel: false
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '确定全部标记为已读吗？',
      success: res => {
        confirm && this.markAlls()
      }
    })
  },

  // 确定标记全部
  markAlls () {
    wx.request({
      method: 'POST',
      url: markAll,
      data: {
        accesstoken: wx.getStorageSync('token')
      },
      success: res => {
        // 刷新未读消息数
        app.getMsgN()
        // 刷新已读/未读数据
        this.get()
      }
    })
  }
})