//index.js
//获取应用实例
import wecropper from '../../../../utils/scale/canvas.js'
const app = getApp()
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
Page({
  data:{
    wecropper: wecropper,
    cropperOpt: {
      id: 'canvas',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 350) / 2,
        y: (height - 300) / 2,
        width: 350,
        height: 300
      }
    }
  },
  touchStart(e) {
    // console.log(this.scaleCanva)
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    console.log(e)
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    var that = this
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        console.log(avatar)
        wx.navigateTo({
          url: '/pages/function/scale/waterLogo/waterLogo?src=' + avatar,
        })
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this
    
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad: function () {
    const { cropperOpt } = this.data
    cropperOpt.src = 'https://img.cdn.powerpower.net/5d469297e4b0c7c776bbbba5.png'
    new wecropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
  }
})
