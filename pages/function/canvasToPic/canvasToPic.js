// pages/function/canvasToPic/canvasToPic.js
const { wxml, style } = require('./html')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.widget = this.selectComponent('.widget')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  renderToCanvas() {
    const p1 = this.widget.renderToCanvas({ wxml, style })
    p1.then((res) => {
      console.log('container', res.layoutBox)
      this.container = res
    })
  },
  extraImage() {
    const p2 = this.widget.canvasToTempFilePath()
    p2.then(res => {
      this.setData({
        src: res.tempFilePath,
        width: this.container.layoutBox.width,
        height: this.container.layoutBox.height
      })
    })
  }
})