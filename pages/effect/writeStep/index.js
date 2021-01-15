// pages/writeStep/in de x.js
import WriteConfig from "../../../utils/writeConfig";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     showDataText:'这是一首简单的小情歌,唱出我们心头的曲折，我想我很快乐。😊',
     showDataText2: '我知道，就算大雨绕着这座城市颠倒，我也给你怀抱。',
     domShowText:'',
     domShowText2:'',
     isShowLight:true,
  },
  writeOneByOne(str = '', druTime = 150){
    let _this = this
    let writeConfig = new WriteConfig({
        PropsStr: str,
        durTime: druTime,
        onUpdate:()=>{
          _this.setData({ domShowText: writeConfig.tempValue})
        },
        onComplete:()=>{
          console.log('敲击完成！')
          // _this.setData({ isShowLight: false })
          // _this.writeOneByOne(_this.data.showDataText2)
        }
    })
  },
  // writeOneByTwo(str = '', druTime = 150){
  //   let _this = this
  //   let writeConfig = new WriteConfig({
  //     PropsStr: str,
  //     durTime: druTime,
  //     onUpdate: () => {
  //       _this.setData({ domShowText2: writeConfig.tempValue })
  //     },
  //     onComplete: () => {
  //       console.log('敲击完成2！')
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.writeOneByOne(this.data.showDataText,120)
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
})