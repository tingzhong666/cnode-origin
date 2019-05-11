Component({
  options: {
    multipleSlots: true
  },
  
  data: {
    header: true,
    footer: true
  },

  properties: {
    mode: {
      type: Number,
      value: 0
    }
  },

  methods: {
    mode (mode) {
      switch (mode) {
        // 去掉底部
        case 1:
          this.setData({
            footer: false
          })
          break
        // 去掉头部和底部
        case 2:
          this.setData({
            header: false,
            footer: false
          })
          break
      }
    }
  },

  attached () {
    this.mode(this.data.mode)
  }
})