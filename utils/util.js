const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 对象排序 倒序
const sortList = (targetArr, key) => {
  return targetArr.sort((a, b) => {
    var val1 = a[key]
    var val2 = b[key]
    return val2 - val1
  })
}
// 获取dom节点
const getRect = (selector) => {
  return new Promise(function (resolve, reject) {
    wx.createSelectorQuery().select(selector).boundingClientRect(function (rect) {
      if (rect) {
        resolve(rect);
      } else {
        reject(new Error("can not find selector: " + selector));
      }
    }).exec();
  });
}
const getAllRects = (selector) => {
  return new Promise(function (resolve, reject) {
    wx.createSelectorQuery().selectAll(selector).boundingClientRect(function (rect) {
      if (rect) {
        resolve(rect);
      } else {
        reject(new Error("can not find selector: " + selector));
      }
    }).exec();
  });
}
module.exports = {
  formatTime: formatTime,
  sortList,
  getRect,
  getAllRects

}
