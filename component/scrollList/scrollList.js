// component/scrollList/scrollList.js
var throttle = function throttle(func, wait, options) {
  var context = void 0;
  var args = void 0;
  var result = void 0;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function later() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
  };
  return function () {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
      return result;
  };
};
Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function observer(newVal) {
          var _this = this;

          if (newVal.length === 0) return;
          var data = this.data;
          var alphabet = data.list.map(function (item) {
              return item.alpha;
          });
          this.setData({
              alphabet: alphabet,
              current: alphabet[0]
          }, function () {
              _this.computedSize();
          });
      }
    },
    vibrated: {
        type: Boolean,
        value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: 612,
    current: 'A',
    intoView: '',
    touching: false,
    alphabet: [],
    _tops: [],
    _anchorItemH: 0,
    _anchorItemW: 0,
    _anchorTop: 0,
    _listUpperBound: 0
  },
  lifetimes: {
      created: function created() {},
      attached: function attached() {
          this.__scrollTo = throttle(this._scrollTo, 100, {});
          this.__onScroll = throttle(this._onScroll, 100, {});

          var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
              windowHeight = _wx$getSystemInfoSync.windowHeight;

          this.setData({ windowHeight: windowHeight });
      }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choose: function choose(e) {
        var item = e.target.dataset.item;
        this.triggerEvent('choose', { item: item });
    },
    scrollTo: function scrollTo(e) {
        this.__scrollTo(e);
    },
    _scrollTo: function _scrollTo(e) {
        var data = this.data;
        var clientY = e.changedTouches[0].clientY;
        var index = Math.floor((clientY - data._anchorTop) / data._anchorItemH);
        var current = data.alphabet[index];
        this.setData({ current: current, intoView: current, touching: true });
        if (data.vibrated) wx.vibrateShort();
    },
    computedSize: function computedSize() {
        var data = this.data;
        var query = this.createSelectorQuery();
        query.selectAll('.index_list_item').boundingClientRect(function (rects) {
            var result = rects;
            data._tops = result.map(function (item) {
                return item.top;
            });
        }).exec();
        query.select('.anchor-list').boundingClientRect(function (rect) {
            data._anchorItemH = rect.height / data.alphabet.length;
            data._anchorItemW = rect.width;
            data._anchorTop = rect.top;
        }).exec();
        query.select('.page-select-index').boundingClientRect(function (rect) {
            data._listUpperBound = rect.top;
        });
    },
    removeTouching: function removeTouching() {
        var _this2 = this;

        setTimeout(function () {
            _this2.setData({ touching: false });
        }, 150);
    },
    onScroll: function onScroll(e) {
        this.__onScroll(e);
    },
    _onScroll: function _onScroll(e) {
        var data = this.data;
        var _tops = data._tops,
            alphabet = data.alphabet;

        var scrollTop = e.detail.scrollTop;
        var current = '';
        if (scrollTop < _tops[0]) {
            current = alphabet[0];
        } else {
            for (var i = 0, len = _tops.length; i < len - 1; i++) {
                if (scrollTop >= _tops[i] && scrollTop < _tops[i + 1]) {
                    current = alphabet[i];
                }
            }
        }
        if (!current) current = alphabet[alphabet.length - 1];
        this.setData({ current: current });
    }

  }
})
