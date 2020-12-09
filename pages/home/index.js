// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemNav: [ 
      { url:'/pages/scale/index/index' ,
        name: '旋转放大'
      },
      {
        url: '/pages/progress/progress',
        name: '进度条'
      },
      {
        url: '/pages/navbar/index',
        name: 'bar'
      },
      {
        url: '/pages/writeStep/index',
        name: 'writeStep'
      },
      {
        url: '/pages/getExistence/index',
        name: '存在值查询'
      },
      {
        url: '/pages/echart/index',
        name: '图表'
      },
      {
        url: '/pages/cssEffect/index',
        name: 'css效果'
      },
      {
        url: '/pages/imgRgba/index',
        name: '获取图片色值'
      },
      {
        url: '/pages/swiperBox/index',
        name: '异步动画'
      },
      {
        url: '/pages/cssTab/cssTab',
        name: '导航动画'
      },
      {
        url: '/pages/observeChange/index',
        name: '容器监听变化'
      },
      {
        url: '/pages/bluetooth/index',
        name: '蓝牙'
      },
      {
        url: '/pages/test/index',
        name: '测试api'
      },
      {
        url: '/pages/testNavTop/index',
        name: '测试自定义导航栏'
      },
      {
        url: '/pages/drivingAnimate/index',
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