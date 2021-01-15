// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemNav: [ 
      { url:'/pages/function/scale/index/index' ,
        name: '旋转放大'
      },
      {
        url: '/pages/effect/progress/progress',
        name: '进度条'
      },
      {
        url: '/pages/effect/writeStep/index',
        name: 'writeStep'
      },
      {
        url: '/pages/effect/getExistence/index',
        name: '存在值查询'
      },
      {
        url: '/pages/effect/cssEffect/index',
        name: 'css效果'
      },
      {
        url: '/pages/effect/swiperBox/index',
        name: '异步动画'
      },
      {
        url: '/pages/effect/cssTab/cssTab',
        name: '导航动画'
      },
      {
        url: '/pages/effect/observeChange/index',
        name: '容器监听变化'
      },
      {
        url: '/pages/function/bluetooth/index',
        name: '蓝牙'
      },
      {
        url: '/pages/function/test/index',
        name: '测试api'
      },
      {
        url: '/pages/function/testNavTop/index',
        name: '测试自定义导航栏'
      },
      {
        url: '/pages/effect/drivingAnimate/index',
        name: '驱动动画'
      },
    ]
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

  },
  jumpScale(e){
    // console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url || ''
    wx.navigateTo({
      url: url
    })
  }
})