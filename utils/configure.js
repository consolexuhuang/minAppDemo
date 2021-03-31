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
        // let location = getApp().base_config.base_config
        reject(err);
      }
    })
  });
}
//获取用户信息
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (true) {
          // 已经授权，可以直接调用 wx.getUserProfile 获取头像昵称 
          // wx.getSetting接口请求用户的授权状态，会直接读取到scope.userInfo为true
          wx.getUserProfile({
            lang: 'zh_CN',
            desc: '用于完善会员资料',
            success: function (res) {
              resolve(res.userInfo)
            },
            fail(){
              reject('您已拒绝授权！')
            }
          })
        } else {
          //  reject('授权失败！')
           wx.showToast({ title: "授权失败！", icon: 'none', duration: 2000 });
        }
      }, 
      fail: function () {
        wx.showToast({ title: "授权失败，请重试", icon: 'none', duration: 2000 });
      }
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
          reject('code登录失败！')
        }
      })
  })
}
/**
 * 组合登录方法 延伸版
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
      //(拒绝授权) 若非强制授权 人口
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
  getUserProfile,
  wx_loginIn
}
