const app = getApp()

Component({
  properties: {
    img: {
      type: String,
      value: null
    },
    name: {
      type: String,
      value: null
    },
    githubName: {
      type: String,
      value: null
    },
    tap: {
      type: Boolean,
      value: false
    },
    // 功能列表
    /** 参数
     * {
            page: '/pages/list/index',
            query: {
              imgshow: 'false',
              label: '创建的主题',
              fonticon: 'iconfont icon-huati',
            },
            fonticon: 'iconfont icon-huati',
            label: '创建的主题',
            n: 123
          }
     */
    list: {
      type: Array,
      value: []
    }
  },

  attached () {
  },

  methods: {
    // 账号点击事件
    login () {
      // 只有 tap 属性为真才出发点击事件
      this.data.tap && this.triggerEvent('login', {})
    },

    // 功能列表点击
    click (e) {
      this.triggerEvent('click', e.currentTarget.dataset)
    }

  }
})