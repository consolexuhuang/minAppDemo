// pages/navbar/index.js
// const WXUI = require('weui-miniprogram')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    color: '#000',
    background: '#f8f8f8',
    show: true,
    animated: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   nbTitle: '新标题',
    //   nbLoading: true,
    //   nbFrontColor: '#ffffff',
    //   nbBackgroundColor: '#000000',
    // })
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

  toggleLoading() {
    this.setData({
      loading: !this.data.loading
    })
  },
  changeColor() {
    this.setData({
      color: '#07C160'
    })
  },
  changeBgColor() {
    this.setData({
      background: '#ededed'
    })
  },
  toggleShow() {
    this.setData({
      show: !this.data.show
    })
  },
  toggleAnimated() {
    this.setData({
      animated: !this.data.animated,
      show: !this.data.show
    })
  }
})