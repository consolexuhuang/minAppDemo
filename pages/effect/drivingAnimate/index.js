// pages/drivingAnimate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customNavTopData:{
      navBg:'#f99',
      navIcon_color:'#000',
      navTitle_color:'#f99'
    },
    navHeight: '',
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
    left: wx.getSystemInfoSync().windowWidth - 17,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this._animate()
  },
  commonNavAttr(res){
    // console.log(res)
    this.setData({navHeight: res.detail.height})
  },
  _animate() {
    wx.createSelectorQuery().select('#scroller').fields({
      scrollOffset: true,
      size: true,
    }, (res) => {
      // 头像
      this.animate('.avatar', [{
        borderRadius: '0',
        borderColor: 'red',
        transform: `scale(1) translateY(-20px)`,
        offset: 0,
      }, {
        borderRadius: '25%',
        borderColor: 'blue',
        transform: 'scale(.65) translateY(-20px)',
        offset: .5,
      }, {
        borderRadius: '50%',
        borderColor: 'blue',
        transform: `scale(.3) translateY(-20px)`,
        offset: 1
      }], 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 0,
        endScrollOffset: 115,
      })
      // 昵称
      this.animate('.nickname', [{
        transform: 'translateY(0)',
      }, {
        transform: `translateY(${-44 - this.data.statusBarHeight}px)`,
      }], 1000, {
        scrollSource: '#scroller',
        timeRange: 1000,
        startScrollOffset: 0,
        endScrollOffset: 200,
      })

      this.animate('.search_input', [{
        opacity: '0',
        width: '0%',
      }, {
        opacity: '1',
        width: '100%',
      }], 1000, {
        scrollSource: '#scroller',
        timeRange: 1000,
        startScrollOffset: 0,
        endScrollOffset: 252
      })

      this.animate('.search_icon', [{
        right: '0',
        transform: 'scale(1)',
      }, {
        right: (wx.getSystemInfoSync().windowWidth * .5 - 20) + 'px',
        transform: 'scale(.6)',
      }], 1000, {
        scrollSource: '#scroller',
        timeRange: 1000,
        startScrollOffset: 20,
        endScrollOffset: 252,
      })
    }).exec()

    // wx.createSelectorQuery().select("#scroller2").fields({
    //   scrollOffset: true,
    //   size: true,
    // }, (res) => {
    //   // 绑定滚动元素
    //   const scrollTimeline = {
    //     scrollSource: '#scroller2',
    //     orientation: 'horizontal',
    //     timeRange: 1000,
    //     startScrollOffset: (210 * this.data.menuList.length - res.width) + 20,
    //     endScrollOffset: res.scrollWidth - res.width,
    //   }
    //   this.animate('#transform', [{
    //     offset: 0,
    //     width: '0px',
    //   }, {
    //     offset: 1,
    //     width: '30px',
    //   }], 1000, scrollTimeline)
    // }).exec()
  },
})