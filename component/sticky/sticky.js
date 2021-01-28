// component/sticky/sticky.js
var target = '.sticky_Assembly';
Component({
  options:{
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 选择局顶部距离
    offsetTop: {
      type: Number,
      value: 0
    },
    zIndex: {
        type: Number,
        value: 99
    },
    disabled: {
        type: Boolean,
        value: false
    },
    container: {
        type: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fixed: false,
    height: 0,
    _attached: false,
    _containerHeight: 0
  },
  // 监听器
  observers: {
    disabled: function disabled(newVal) {
        if (!this._attached) return;
        newVal ? this.disconnectObserver() : this.initObserver();
    },
    container: function container(newVal) {
        if (typeof newVal !== 'function' || !this.data.height) return;
        this.observerContainer();
    }
  },
  lifetimes: {
    attached: function attached() {
        this.data._attached = true;
        if (!this.data.disabled) this.initObserver();
    },
    detached: function detached() {
        this.data._attached = false;
        this.disconnectObserver();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getContainerRect: function getContainerRect() {
      var nodesRef = this.data.container();
      return new Promise(function (resolve) {
          return nodesRef.boundingClientRect(resolve).exec();
      });
    },
    initObserver: function initObserver() {
      var _this = this;

      this.disconnectObserver();
      this.getRect(target).then(function (rect) {
          _this.setData({
              height: rect.height
          });
          _this.observerContent();
          _this.observerContainer();
      });
    },
    disconnectObserver: function disconnectObserver(observerName) {
        if (observerName) {
            var observer = this[observerName];
            observer && observer.disconnect();
        } else {
            this.contentObserver && this.contentObserver.disconnect();
            this.containerObserver && this.containerObserver.disconnect();
        }
    },
    observerContent: function observerContent() {
        var _this2 = this;

        var offsetTop = this.data.offsetTop;

        this.disconnectObserver('contentObserver');
        var contentObserver = this.createIntersectionObserver({
            thresholds: [1],
            initialRatio: 1
        });
        contentObserver.relativeToViewport({
            top: -offsetTop
        });
        contentObserver.observe(target, function (res) {
            if (_this2.data.disabled) return;
            _this2.setFixed(res.boundingClientRect.top);
        });
        this.contentObserver = contentObserver;
    },
    observerContainer: function observerContainer() {
        var _this3 = this;

        var _data = this.data,
            container = _data.container,
            height = _data.height,
            offsetTop = _data.offsetTop;

        if (typeof container !== 'function') return;
        this.disconnectObserver('containerObserver');
        this.getContainerRect().then(function (rect) {
          _this3.getRect(target).then(function (contentRect) {
                var _contentTop = contentRect.top;
                var _containerTop = rect.top;
                var _containerHeight = rect.height;
                var _relativeTop = _contentTop - _containerTop;
                var containerObserver = _this3.createIntersectionObserver({
                    thresholds: [1],
                    initialRatio: 1
                });
                containerObserver.relativeToViewport({
                    top: _containerHeight - height - offsetTop - _relativeTop
                });
                containerObserver.observe(target, function (res) {
                    if (_this3.data.disabled) return;
                    _this3.setFixed(res.boundingClientRect.top);
                });
                _this3.data._relativeTop = _relativeTop;
                _this3.data._containerHeight = _containerHeight;
                _this3.containerObserver = containerObserver;
            });
        });
    },
    setFixed: function setFixed(top) {
        var _data2 = this.data,
            height = _data2.height,
            _containerHeight = _data2._containerHeight,
            _relativeTop = _data2._relativeTop,
            offsetTop = _data2.offsetTop;

        var fixed = _containerHeight && height ? top >= height + offsetTop + _relativeTop - _containerHeight && top < offsetTop : top < offsetTop;
        this.triggerEvent('scroll', {
            scrollTop: top,
            isFixed: fixed
        });
        this.setData({ fixed: fixed });
    },
    getRect(selector){
      let _this = this
      return new Promise(function (resolve, reject) {
        _this.createSelectorQuery().select(selector).boundingClientRect(function (rect) {
          if (rect) {
            resolve(rect);
          } else {
            reject(new Error("can not find selector: " + selector));
          }
        }).exec();
      });
    },
  }
})
