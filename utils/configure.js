import { login } from './api'
// 获取地理位置
const getLocation = () => {
  return new Promise((resolve) => {
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy:true,
      success(res) {
        resolve(res);
      },
      fail(err) {
        //默认值
        let location = getApp().base_config.base_config
        resolve(err);
      }
    })
  });
}
//获取用户信息
const getUserInfo = () => {
  return new Promise((resolve, reject) => {
      wx.getUserInfo({
        lang: 'zh_CN',
        success(res_userInfo) {
          console.log('用户信息', res_userInfo)
          let userInfo = {
            nickName: res_userInfo.userInfo.nickName || '',
            headImg: res_userInfo.userInfo.avatarUrl || '',
            city: res_userInfo.userInfo.city || '',
            gender: res_userInfo.userInfo.gender || '',
            encryptedData: res_userInfo.encryptedData || '',
            iv: res_userInfo.iv || '',
            rawData: res_userInfo.rawData || '',
            signature: res_userInfo.signature || '',
          }
          resolve(userInfo)
        },
        fail() {
          reject('拒绝授权')
        },
      })
  })
}
// 获取code
const getCode = () => {
  return new Promise((resolve,reject) => {
      wx.login({
        success: res_code => {
          resolve(res_code)
        },
        fail: () => {
          // console.error('登录失败！')
          reject('登录失败！')
        }
      })
  })
}
/**
 * 组合登录方法
 * @param {*} type （Strig）
 * location : 定位登录
 * userinfo ： 用户信息登录
 * phone ： 电话登录
 * ''   : 普通登录
 */
const wx_loginIn = (type) => {
  return new Promise((resolve, reject) => {
    let argumentFun
    switch(type){
      case 'location': argumentFun = getLocation
         break;
      case 'userinfo': argumentFun = getUserInfo
         break;
      case 'phone': argumentFun = getUserInfo
    }
    
    Promise.all([ getCode(),  (typeof argumentFun == 'function' && argumentFun()) ]).then(res => {
      console.log(res)
      let baseData = {
        code: res[0].code,
      }
      let argData = res[1]

      login( Object.assign(baseData, argData) ).then(login_res => {
          resolve(login_res)
      },login_fail => {
          reject(login_fail)
      })
    })

  })
}
module.exports = {
  getLocation,
  getUserInfo,
  wx_loginIn
}
