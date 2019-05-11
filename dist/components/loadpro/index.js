Component({
  properties: {
    show: {
      type: Boolean,
      value: true
    }

  },
  
  data: {
    percent: 0,
    animationed: false,
    shows: true
  },

  observers: {
    'show': function (v) {
      if (v || !this.data.animationed) return
      this.setData({
        percent: 100,
        shows: false
      })
      this.ok()
    }
  },

  attached () {
    this.animation(20, 200)
      .then(() => {
        return this.animation(60, 100)
      })
      .then(() => {
        return this.animation(90, 100)
      })
      .then(() => {
        this.setData({
          animationed: true
        })
        
        if (!this.data.show) {
          this.animation(100, 200)
          .then(() => {
            this.setData({
              shows: false
            })
            this.ok()
          })
        }
      })
  },

  methods: {
    animation (percent, s) {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            this.setData({
              percent
            })
            resolve()
          }, s)
        } catch (error) {
          reject(error)
        }
      })
    },

    // 触发事件
    ok () {
      this.triggerEvent('ok', {})
    }

  }

})