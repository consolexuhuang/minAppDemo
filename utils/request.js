// import base_config from './baseConfig.js'
import errorCode from './error'
const request = (config) => {
  //获取存储报错数据
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().base_config.API_URI + config.url, 
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // '_token': Store.getItem('userData').token,
        // 'formId': Store.getItem('formId') ? Store.getItem('formId').join(',') : ''
        // 'content-type': 'application/json',
      },
      data: config.data,
      method: config.method,
      success: function(res) {
        resolve(res.data)
      },
      fail: function(res) {
        reject(res.data)
      },
    })
  })
}
module.exports = {
  request
}