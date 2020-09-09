class WriteConfig {
  constructor(opt) {
    let  def = {
      PropsStr:'', //加载文字
      durTime: 150,// 刷新一次的时间
      onUpdate: function () { }, // 更新时回调函数
      onComplete: function () { } // 完成时回调函数
    }
    this.tempValue = ''
    this.opt = Object.assign(def, opt);//assign传入配置参数
    this.loopCount = 0;//循环次数计数
    this.transformArr = opt.PropsStr.split(''),
    this.interval = null;//计时器对象
    this.init();
  }
  init() {
    this.interval = setInterval(() => { this.updateTimer() }, this.opt.durTime);
  }

  updateTimer() {
    if (this.loopCount < this.transformArr.length) {
      this.tempValue += this.transformArr[this.loopCount]
    } else {
      this.opt.onComplete();
      clearInterval(this.interval);
    }
    this.loopCount++;
    this.opt.onUpdate();
  }
}
export default WriteConfig