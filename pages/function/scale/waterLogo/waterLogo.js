let index = 0,
  items = [], flag = true,
  itemId = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    logoSrc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ logoSrc: options.src})
    items = this.data.itemList;
    this.setDropItem({
      url: 'https://img.cdn.powerpower.net/5d416646e4b0e3fd6800a785.png'
    });
    // this.setDropItem({
    //   url: 'https://img.cdn.powerpower.net/5d416646e4b0e3fd6800a785.png'
    // });
  },
  setDropItem(imgData) {
    let data = {},
      _this = this;
    wx.getImageInfo({
      src: imgData.url,
      success: res => {
        // 初始化数据
        data.width = 100;//宽度
        data.height = 100;//高度
        data.image = imgData.url;//地址
        data.id = ++itemId;//id
        data.top = 0;//top定位
        data.left = 0;//left定位
        //圆心坐标
        data.x = data.left + data.width / 2;
        data.y = data.top + data.height / 2;
        data.scale = 1;//scale缩放
        data.oScale = 1;//方向缩放
        data.rotate = 1;//旋转角度
        data.active = false;//选中状态
        console.log(data)
        items[items.length] = data;
        _this.setData({
          itemList: items
        })
      }
    })
  },
  WraptouchStart: function (e) {
    for (let i = 0; i < items.length; i++) {
      items[i].active = false;
      if (e.currentTarget.dataset.id == items[i].id) {
        index = i;
        items[index].active = true;
      }
    }
    this.setData({
      itemList: items
    })

    items[index].lx = e.touches[0].clientX;
    items[index].ly = e.touches[0].clientY;

    console.log(items[index])
  },
  WraptouchMove: function (e) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
      }, 100)
    }
    // console.log('WraptouchMove', e)
    items[index]._lx = e.touches[0].clientX;
    items[index]._ly = e.touches[0].clientY;

    items[index].left += items[index]._lx - items[index].lx;
    items[index].top += items[index]._ly - items[index].ly;
    items[index].x += items[index]._lx - items[index].lx;
    items[index].y += items[index]._ly - items[index].ly;

    items[index].lx = e.touches[0].clientX;
    items[index].ly = e.touches[0].clientY;
    // console.log(items)
    this.setData({
      itemList: items
    })
  },
  oTouchStart: function (e) {
    //找到点击的那个图片对象，并记录
    for (let i = 0; i < items.length; i++) {
      items[i].active = false;
      if (e.currentTarget.dataset.id == items[i].id) {
        console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
        index = i;
        items[index].active = true;
      }
    }
    //获取作为移动前角度的坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;
    //移动前的角度
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)
    //获取图片半径
    items[index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top);
    console.log(items[index])
  }
  ,
  oTouchMove: function (e) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
      }, 100)
    }
    //记录移动后的位置
    items[index]._tx = e.touches[0].clientX;
    items[index]._ty = e.touches[0].clientY;
    //移动的点到圆心的距离
    items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx, items[index]._ty - 10)

    items[index].scale = items[index].disPtoO / items[index].r;
    items[index].oScale = 1 / items[index].scale;

    //移动后位置的角度
    items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
    //角度差
    items[index].new_rotate = items[index].angleNext - items[index].anglePre;

    //叠加的角度差
    items[index].rotate += items[index].new_rotate;
    items[index].angle = items[index].rotate; //赋值

    //用过移动后的坐标赋值为移动前坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)

    //赋值setData渲染
    this.setData({
      itemList: items
    })

  },
  getDistancs(cx, cy, pointer_x, pointer_y) {
    var ox = pointer_x - cx;
    var oy = pointer_y - cy;
    return Math.sqrt(
      ox * ox + oy * oy
    );
  },

  /*
     *参数1和2为图片圆心坐标
     *参数3和4为手点击的坐标
     *返回值为手点击的坐标到圆心的角度
     */
  countDeg: function (cx, cy, pointer_x, pointer_y) {
    var ox = pointer_x - cx;
    var oy = pointer_y - cy;
    var to = Math.abs(ox / oy);
    var angle = Math.atan(to) / (2 * Math.PI) * 360;
    // console.log("ox.oy:", ox, oy)
    if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
    {
      angle = -angle;
    } else if (ox <= 0 && oy >= 0)//左下角,3象限  
    {
      angle = -(180 - angle)
    } else if (ox > 0 && oy < 0)//右上角，1象限  
    {
      angle = angle;
    } else if (ox > 0 && oy > 0)//右下角，2象限  
    {
      angle = 180 - angle;
    }
    return angle;
  },
  deleteItem: function (e) {
    let newList = [];
    for (let i = 0; i < items.length; i++) {
      if (e.currentTarget.dataset.id != items[i].id) {
        newList.push(items[i])
      }
    }
    if (newList.length > 0) {
      newList[newList.length - 1].active = true;
    }
    items = newList;
    this.setData({
      itemList: items
    })
  },
  getDownloadImg() {
    // wx.showLoading({ title: '生成中...', mask: true, });
    var that = this;
    wx.downloadFile({
      url: that.data.logoSrc, //图片路径
      success: function (res) {
        // wx.hideLoading();
        if (res.statusCode === 200) {
          var bgSrc = res.tempFilePath; //下载成功返回结果
          that.getlogo(bgSrc); //继续下载
        } else {
          wx.showToast({
            title: '下载失败！',
            icon: 'none',
          })
        }
      }
    })
  },
  getlogo(bgSrc){
    var that = this;
    wx.downloadFile({
      url: "https://img.cdn.powerpower.net/5d416646e4b0e3fd6800a785.png", //图片路径
      success: function (res) {
        // wx.hideLoading();
        if (res.statusCode === 200) {
          var logoSrc = res.tempFilePath; //下载成功返回结果
          that.saveCanvasImg(bgSrc, logoSrc); //继续下载
        } else {
          wx.showToast({
            title: '下载失败！',
            icon: 'none',
          })
        }
      }
    })
  },

  saveCanvasImg(bgSrc, logoSrc) {
    var that = this
    // console.log(bgSrc, logoSrc)
    const ctx = wx.createCanvasContext('myCanvas')
    wx.createSelectorQuery().select('#canvas').boundingClientRect(function (rect) {
      console.log(rect)
      var height = rect.height;
      var width = rect.width
      if (bgSrc) {
        ctx.drawImage(bgSrc, 0, 0, width, height);
      }
      // if (logoSrc) {
      //   ctx.drawImage(logoSrc, that.itemList[0].left, that.itemList[0].top, that.itemList[0].width, that.itemList[0].height);
      // }
      // ctx.save()
      // ctx.clip()
      // maskCanvas.stroke();
      console.log(items, items[0].angle * Math.PI / 180)
      let prop = 1
      ctx.save();
      ctx.translate(items[0].x * prop, items[0].y * prop); //圆心坐标
      ctx.rotate(items[0].angle * Math.PI / 180); // 旋转值
      ctx.translate(-(items[0].width * items[0].scale * prop / 2), -(items[0].height * items[0].scale * prop / 2))
      ctx.drawImage(logoSrc, 0, 0, items[0].width * items[0].scale * prop, items[0].height * items[0].scale * prop);
      ctx.restore();
      setTimeout(function () {
        ctx.draw(true);
      }, 1000)
      
    }).exec()
    
  },
  save(){
    // setTimeout(()=>{
    //   console.log(wx.createSelectorQuery().select('#canvas').boundingClientRect())
    // },0)
    // wx.createSelectorQuery().select('#canvas').boundingClientRect(function (rect) {
    // })
    this.getDownloadImg()
  },
  /**
   * 3.保存本地
   */
  save2() {
    var that = this;
    wx.showLoading({ title: '正在保存', mask: true, })
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        fileType: 'jpg',
        success: function (res) {
          console.log(res.tempFilePath)
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: function (res) {
              console.log(res)
              wx.showModal({
                title: '提示',
                content: '您的推广海报已存入手机相册，赶快分享给好友吧',
                showCancel: false,
              })
            },
            fail: function (err) {
              console.log(err)
              // 防止用户禁止了授权,这须手动调起权限了
              if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
                // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
                wx.showModal({
                  title: '提示',
                  content: '需要您授权保存相册',
                  showCancel: false,
                  success: modalSuccess => {
                    wx.openSetting({
                      success(settingdata) {
                        console.log("settingdata", settingdata)
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限成功,再次确认即可保存',
                            showCancel: false,
                          })
                        } else {
                          wx.showModal({
                            title: '提示',
                            content: '获取权限失败，将无法保存到相册哦~',
                            showCancel: false,
                          })
                        }
                      },
                      fail(failData) {
                        console.log("failData", failData)
                      },
                      complete(finishData) {
                        console.log("finishData", finishData)
                      }
                    })
                  }
                })
              }
            }
          })
        }
      })
    })
  },
})