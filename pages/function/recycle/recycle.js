// pages/function/recycle/recycle.js
import { getlist } from '../../../utils/api'
const createRecycleContext = require('miniprogram-recycle-view')
Page({
  name: 'recycleListPage', // 编辑某项后需要通过这个标记更新列表中对应的项
  /**
   * 页面的初始数据
   */
  data: {
    loadingText: '加载中',
  },
  variables: {
    pager: {
        page: 0,
        size: 10,
        hasMore: true // 是否已全部显示完
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;
    self.ctx = createRecycleContext({
        id: 'recycleId', // 对应 Html 中 list 组件的 id
        dataKey: 'recycleList', // wx:for 绑的数据
        page: this,
        itemSize: function(item, index) {
            // 这个 itemSize 只是给 JS 计算滚动用的，CSS 那要再写一次并且保持数值一致
            // JS 不会自动从 CSS 那读也不会给 HTML 设置这里的 width 和 height
            // 每个 item 的高度可以不一样
            let rs = {
                width: this.transformRpx(750),
                height: 135,
            };
            return rs;
        },
        useInPage: true,
        root: getCurrentPages()[getCurrentPages().length - 1],
    });
    self.refresh();
  },
  refresh: function () {
    let self = this;
    self.ctx.splice(0,  self.ctx.comp.sizeArray.length);
    self.variables.pager.page = 0; // loadData 时会 ++
    self.variables.pager.hasMore = true;
    self.loadData();
 },
  // 更新列表中的某项
  update: function (data = {}, type = 'update') {
      let self = this;
      let idx = self.data.recycleList.findIndex(v => { // 待更新项在页面上 recycle-list 里的索引
        return data.id && v.id === data.id;
      });
      // 去除空值的属性
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if (element == null) {
            delete data[key];
          }
        }
      }
      if (idx !== -1) {
        if ('update' == type) {
          self.ctx.update(idx, [{
            ...self.data.recycleList[idx],
            ...data
          }]);
        } else if ('delete' == type) {
          self.ctx.splice(idx, 1);
        }
      } else {
        console.error('列表里找不到待更新项：', idx, data, self.data.recycleList.map(v => v.id));
      }
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
  loadData(params = {}) {
    let self = this;
    self.variables.pager.page++;
    let data = {
      pageIndex: self.variables.pager.page,
      pageSize: self.variables.pager.size,
    };
    wx.showLoading();
    getlist(data).then(res => { 
        wx.hideLoading();
        console.log('res',res.data)
        let recycleList = res.data && res.data.merchants || [];
        if (!recycleList.length) {
            self.variables.pager.hasMore = false;
        }
        recycleList = recycleList.map(v => {
            return {
                id: v.id,
                title: v.name,
                src:v.logoPath
            };
        });
        self.ctx.append(recycleList);

        let data = {};
        let loadingText = self.data.loadingText;
        if (res.data && res.data.merchants && !recycleList.length && self.variables.pager.page>1) {
            loadingText = '没有了';
        }
        if (res.data && res.data.merchants.length == 0 && self.variables.pager.page === 1) {
            loadingText = '暂无数据';
        }
        data.loadingText = loadingText;
        self.setData(data);
    },()=>{
      wx.hideLoading();
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let self = this;
    self.refresh();
  },
  // 这个 scroll 空着就行 recycle-view 要求必须有
  onPageScroll(e) {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let self = this;
    if (self.variables.pager.hasMore) {
        this.loadData();
    }
  },
})