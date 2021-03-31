// component/userInfoTool/userInfoTool.js
const app = getApp()
var { configure , http, isLoginToMethod, isGetUserInfoMethod} = getApp() 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAutoShowTool: { 
      type: Boolean,
      value: false
    },
    show: { 
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  ready(){
    // 是否需要在 登陆情况下 进入 自动显示
    // isGetUserInfoMethod()该方法需要登陆后使用
    // console.log('readyisAutoShowTool',!isLoginToMethod(), isGetUserInfoMethod(), this.data.isAutoShowTool)
    if(!isLoginToMethod() &&  isGetUserInfoMethod() && this.data.isAutoShowTool){
      this.setData({show:true})
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _onClose(){
      this.setData({show:false})
    },
    _preUserInfoMethod(){
      
      // 在登陆的情况下，没有用户信息则点击摁钮先授权用户信息
      if( isGetUserInfoMethod() ){
        this.setData({show:true})
      }else{
        this.EventListener();
      }

    },
    _getUserProfileToLogin(){
      let _this = this
      configure.getUserProfile().then(res_userInfo => {
        var params = {
          "headPicture": res_userInfo.avatarUrl,
          "name":res_userInfo.nickName,
          "sex":res_userInfo.gender,
          // "encryptedData": res_userInfo.encryptedData,
          // "iv": res_userInfo.iv,
          // "rawData": res_userInfo.rawData,
          // "signature": res_userInfo.signature,
        };
        //更新用户的信息
        http("updateUserInfoTwo", params, false).then(() => {
          //关闭窗口
          _this._onClose()
          // _this.EventListener();
          //重新拉取用户的信息
          app.resetUserInfo().then(res => {
            let pages = getCurrentPages();//所有的页面
            let prevPage = pages[pages.length - 1];//当前页面
            app.pushInitData(prevPage);
            _this.EventListener();
          });
        });
      },(res_fail)=>{
        console.log(res_fail)
      })
    },
    //下面开始向外部进行传输参数
    EventListener: function (e) {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('userInfoToolEvent', myEventDetail, myEventOption)
    },

  }
})
