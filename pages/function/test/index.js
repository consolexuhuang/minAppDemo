// pages/test/index.js
import { getlist } from '../../../utils/api'
import { wx_loginIn,passIsLogin } from '../../../utils/configure'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // userInfoToolState:false
  },
  bindinput(e){
    console.log('bindinput',e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().initFun(this).then(() => {
      this.setData({state:true})
    })
    
    // // passIsLogin()
    // wx_loginIn().then(res => { 
    //   console.log('res',res) 
    // },()=>{
    //   // 属于新用户去强制授权登录
    // })
    
  },
  userInfoToolEvent(){
    console.log('userInfoToolEvent用户组件回调')
  },
  // getUserInfo(){
  //   this.setData({userInfoToolState:true})
  // },

  // bindgetuserinfo(){
  //   wx_loginIn('userinfo').then(res => { 
  //     console.log('res',res) 
  //   })
  // },
  // getPhoneNumber(e){
  //   wx_loginIn('phone',e).then(res => { 
  //     console.log('res',res) 
  //   })
  // },
  // getNewUserInfo(){
  //   wx.getUserProfile({
  //     desc:'测试新api',
  //     lang:'zh_CN',
  //     success(res){
  //       console.log('success',res)
  //     },
  //     fail(res){
  //       console.log('fail',res)
  //     }
  //   })
  // },

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})