// pages/observeChange/index.js
let _observer = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    changeState:false,
    _observer:'',

    // loading: false,
    // color: '#000',
    // background: '#f8f8f8',
    // show: true,
    // animated: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._observer = wx.createIntersectionObserver(this)
    this._observer.relativeTo('.topTab', { bottom: 0 }).observe('.selectCont', (res) => {
      console.log('容器相交触发', res)
      this.setData({
        _observer: this._observer._observerId
      })
      // console.log(this.data._observer)
      if (res.intersectionRatio > 0){
          this.setData({
            changeState:true
          })
      } else {
        this.setData({
          changeState: false
        })
      }
    })
    
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
  onUnload(){
    console.log(this._observer)
    if (this._observer) this._observer.disconnect()
  }
})