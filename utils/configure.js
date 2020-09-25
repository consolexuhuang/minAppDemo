import { login } from './api'
// 获取地理位置
const getLocation = () => {
  return new Promise((resolve) => {
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy:true,
      success(res) {
        // 处理用户授权定位数据...
        resolve(res);
      },
      fail(err) {
        //默认值
        let location = getApp().base_config.base_config
        reject(err);
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
          // 处理用户信息数据...
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
//获取用户电话加密信息
const getUserPhone = (e) => {
  return new Promise((resolve, reject) => {
    if (e.detail.iv == null || e.detail.encryptedData == null) {
      reject('电话授权失败')
    } else {
      //处理电话加密数据...
      let data = {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
      }
      resolve(data)
    }

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
 * @param {*} payload (any)
 * 方法传递参数
 */
const wx_loginIn = (type, payload='') => {
  return new Promise((resolve, reject) => {
    let argumentFun
    switch(type){
      case 'location': argumentFun = getLocation
         break;
      case 'userinfo': argumentFun = getUserInfo
         break;
      case 'phone': argumentFun = getUserPhone
    }
    Promise.all([ getCode(),  (typeof argumentFun == 'function' && argumentFun(payload)) ]).then(res => {
      console.log(res)
      // code回调参数
      let baseData = { code: res[0].code }
      //组合授权回调参数
      let argData = res[1] ? res[1] : {}
      // 当授权成功后 登录接口
      login( Object.assign(baseData, argData) ).then(login_res => {
          //处理登录成功数据...
          resolve(login_res)
      },login_fail => {
          reject(login_fail)
      })
    }, fail_res => {
      console.log(fail_res)
      // 若非强制授权 人口
      resolve( wx_loginIn() )
    })

  })
} 

//校验是否通过登陆
const passIsLogin = () => {
  if (
    this.store.getItem('userData') &&
    this.store.getItem('userData').token
  )
    return true
  else return false
}

module.exports = {
  getLocation,
  getUserInfo,
  wx_loginIn
}
