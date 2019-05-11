const { topics } = require('../../config'),
  { time } = require('../../utils/util')

Page({
  data: {
    list: null,
    tabs: [
      { label: '全部', active: true},
      { label: '精华', active: false},
      { label: '分享', active: false},
      { label: '问答', active: false},
      { label: '招聘', active: false}
    ],
    avtive: '全部',
    page: 1,
    top: false
  },

  onLoad: function () {
    this.getList('全部')
      .then(data => {
        this.setData({
          list: data
        })
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
  },

  /**
   * 获取 主题/帖子 列表
   * @param {Strung} tab 主题分类
   * @param {Number} page 页数
   */
  getList (tab = '', page = 1) {
    return new Promise((resolve, reject) => {
      this.setData({
        page
      })
      switch (tab) {
        case '全部':
          tab = ''
          this.setData({
            active: '全部'
          })
          break
        case '精华':
          tab = 'good'
          this.setData({
            active: '精华'
          })
          break
        case '分享':
          tab = 'share'
          this.setData({
            active: '分享'
          })
          break
        case '问答':
          tab = 'ask'
          this.setData({
            active: '问答'
          })
          break
        case '招聘':
          tab = 'job'
          this.setData({
            active: '招聘'
          })
          break
      }
      wx.request({
        url: topics,
        method: 'GET',
        data: {
          tab,
          page,
          limit: 20
        },
        success: res => {
          let data = this.handle(res.data.data)
          resolve(data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  
  // 获取数据处理
  handle (data) {
    data.forEach(item => {
      // 不同分类下，分类图标是否显示
      item.show = true
      if (this.data.active === '分享' || this.data.active === '招聘' || this.data.active === '问答') {
        if (!item.good && !item.top) item.show = false
      }
    })
    return data
  },

  // 分类点击
  tabTap (e) {
    this.setData({
      list: null
    })
    let index = e.currentTarget.dataset.index
    this.data.tabs.forEach((item, index) => {
      this.setData({
        [`tabs[${index}].active`]: false
      })
    })
    this.setData({
      [`tabs[${index}].active`]: true
    })
    this.getList(this.data.tabs[index].label)
      .then(data => {
        this.setData({
          list: data
        })
      })
  },

  // 触底加载
  onReachBottom () {
    this.getList(this.data.active, ++this.data.page)
      .then(data => {
        data = this.data.list.concat(data)
        this.setData({
          list: data
        })
      })
  }

})
