// pages/imgRgba/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取图片信息
  getImageInfo(imgUrl){
    wx.getImageInfo({
      src: imgUrl,
      success: (imgInfo) => {
        console.log(imgInfo)
        let {
          width,
          height,
          path
        } = imgInfo;
        let ctx = wx.createCanvasContext('canvasId');
        ctx.drawImage(path, 0, 0, width, height);
        ctx.draw(false, () => {
          wx.canvasGetImageData({
            canvasId: 'canvasId',
            x: 0,
            y: 0,
            width: width,
            height: height,
            success(res) {
              // console.log(res,'dsdsd')
              var pixels = res.data;
              var pixelCount = width * height;
              var pixelArray = [];
              // 对像素数据进行预处理
              for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
                offset = i * 4;
                r = pixels[offset + 0];
                g = pixels[offset + 1];
                b = pixels[offset + 2];
                a = pixels[offset + 3];
                if (a >= 125) {
                  if (!(r > 250 && g > 250 && b > 250)) {
                    pixelArray.push([r, g, b]);
                  }
                }
              }
              var cmap = MMCQ.quantize(pixelArray, colorCount);//聚类，MMCQ是个用于图像分析的库
              var palette = cmap ? cmap.palette() : null;
              console.log('配色为：', palette);
            }
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImageInfo('https://img.cdn.powerpower.net/5df0bbb2e4b05795c0c8b63e.jpg')
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