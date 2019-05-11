Component({
  methods: {
    top () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 700
      })
    }
  }
})