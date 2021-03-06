//app.js
import base_config from './utils/baseConfig'
import errorCode from './utils/error.js';
var { apiPath } = require('./utils/api.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    this.base_config = base_config

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   * 利用code进行登录
   */
  initFun(objPage){

    return new Promise( resolve => {

      this.pushInitData(objPage);

      this.wx_loginIn().then(() => {
        resolve()
      })

    })

  },

  // 普通微信登陆
  wx_loginIn(){
    let _this = this
    return new Promise((resolve, reject) => {
      if( JSON.stringify(_this.globalData.userInfo) == "{}" || _this.globalData.token == '' ){
        // 登录（用户信息授权）
        wx.login({
          success: res => {
            _this.globalData.code = res.code;
            //通过code码登录
            _this.http("loginByCode", { code: res.code }, false).then(data => {
              console.log(data)
              if ((data != null) && data.token) {
                _this.globalData.token = data.token;
                _this.globalData.userInfo = data;
    
                // 获取用户信息
                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        success: res => {
                          var params = { 
                            code: _this.globalData.code,
                            encryptedData: res.encryptedData,
                            iv: res.iv,
                            signature: res.signature,
                            rawData: res.rawData
                          }
                          
                          //更新用户信息
                          _this.http("updateUserInfo", params, function (user) {
                            _this.globalData.userInfo = user;
                            resolve()
                          }, false);
                        },
                        fail: res_fail => {
                          //  非强制授权
                          resolve()
                        }
                      })
                    }
                  }
                })
              } else {
                // funName();
              }
            }, () => {
              wx.showToast({ title: '登录失败' ,icon:'none'})
            });
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      } else{
        // 老用户无须登录
        resolve()
      }
    })
  },

  /**
   * 给所有的模板默认注入变量
   */
  pushInitData: function (objPage) {
    let _this = this

    objPage.setData({
      userInfo: _this.globalData.userInfo,
      token: _this.globalData.token,
    });
  },

  globalData: {
    //用户的token
    token: "",
    //用户的个人信息
    userInfo: {},

    systeminfo: false,   //系统信息
    headerBtnPosi: false,  //头部菜单高度
  },
  /**------------------------------------------------------------------------------
   * -------------------------下面是公共的事件方法-----------------------------------
   --------------------------------------------------------------------------------*/
   /********下面是公共的网络请求************** */
   http( apiname, params, wait_icon = true ){
    let _this = this
    return new Promise((resolve,reject) => {
      //无网络时做提示no net
      wx.getNetworkType({
        success: function (res) {
          if (res.networkType == "none") {
            let pages = getCurrentPages();//所有的页面
            let prevPage = pages[pages.length - 1];//当前页面
            prevPage.setData({ network: "none" });
          }
        }
      })
    
      // 提取api地址
      let urlConfig = apiPath[apiname];
      
      // 跳过登录
      if ((urlConfig[2] == 'login') && ((_this.globalData.token == "") || (JSON.stringify(_this.globalData.userInfo) == "{}"))) {
        wx.showToast({ title: '请登录后操作' ,icon:'none'}); return false;
      }
    
      // 是否请求同时加载loading
      if (wait_icon) {
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 })
      }
    
      //下面处理不同服务器的调用 
      if (urlConfig[3] == "server") {
        //异业联盟后端的调用
        let {key, version, clientType, API_URI} = base_config
        let paramsComp = { key, version, clientType }
        // wx原生request
        wx.request({
          url: API_URI + urlConfig[0],
          data: Object.assign(params, paramsComp) ,
          header: {
            "content-type": 'application/x-www-form-urlencoded',
            "userToken": _this.globalData.token || '',
          },
          method: urlConfig[1],
          success: (res) => {
            // console.log(res)
            // 关闭loading
            if (wait_icon) { wx.hideToast(); }
            // 处理状态码
            let status_code = res.data.httpCode ? res.data.httpCode : res.statusCode
            let error_code = res.data.errorCode ? res.data.errorCode : ''
            let error_msg = ''

            if (res.data.retData) { resolve(res.data.retData); }

            else { 
              
              if( errorCode[error_code] ) {
                error_msg = errorCode[error_code]
                wx.showToast({ title: error_msg }) 
              }

              reject(res)
              
            }

          }, 
          fail: (res) => {
            // 关闭loading
            if (wait_icon) { wx.hideToast(); }
            wx.showToast({ title: '网络错误，请重试' ,icon:'none'})
          }

        })
      }
    })
   },
})