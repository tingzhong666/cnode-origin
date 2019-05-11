const { user, topicCollect, messages, countL } = require('../config')

function time (time) {
  // 最后评论时间处理
  let stamp = new Date().getTime() - new Date(time).getTime()
  // 年月日时分
  let times = []
  times.push({ time: stamp / 1000 / 60 / 60 / 24/ 30 / 12, unit: '年前'})
  times.push({ time: stamp / 1000 / 60 / 60 / 24/ 30, unit: '个月前'})
  times.push({ time: stamp / 1000 / 60 / 60 / 24, unit: '天前'})
  times.push({ time: stamp / 1000 / 60 / 60, unit: '小时前'})
  times.push({ time: stamp / 1000 / 60, unit: '分钟前'})
  times.push({ time: stamp / 1000, unit: '秒前'})
  times = times.find(item => {
    return item.time > 1
  })
  return Math.floor(times.time) + times.unit
}

// 获取用户信息 创建/参于列表
function getUser (userName) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: user + '/' + userName,
      method: 'GET',
      success: res => {
        res.data.success && resolve(res.data.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 获取收藏列表
function getCollect (userName) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: topicCollect + '/' + userName,
      method: 'GET',
      success: res => {
        res.data.success && resolve(res.data.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 获取消息
function getMsg (token) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: messages,
      method: 'GET',
      data: {
        accesstoken: token
      },
      success: res => {
        const { has_read_messages, hasnot_read_messages } = res.data.data
        resolve([has_read_messages, hasnot_read_messages])
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 获取未读消息数
function getMsgN (token) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: countL,
      method: 'GET',
      data: {
        accesstoken: token
      },
      success: res => {
        resolve(res.data.data)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = {
  time,
  getUser,
  getCollect,
  getMsg,
  getMsgN
}
