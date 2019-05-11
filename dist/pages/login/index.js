const app = getApp()

Page({
  // 扫码
  scan () {
    wx.scanCode({
      success: res => {
        wx.setStorageSync('token', res.result)
        app.check()
          .then(res => {
            if (res) {
              wx.showToast({
                title: '登录成功',
                success: () => {
                  wx.reLaunch({
                    url: '/pages/user/index'
                  })
                }
              })
            } else {
              wx.showToast({
                title: '登录失败'
              })
            }
          })
      },
      fail: err => {
        console.log(err)
      }
    })
  }

})