//下面是接口配置    接口名     接口地址       传输方式  调用条件（login-登陆才能调用 common-没有限制）
var apiPath = {
  getlist:['/merchant/app/merchant/getListNews', "POST", "common","server"],
  //利用code登录接口
  loginByCode: ['/cbase/loginCode', "POST", "common","server"],
  //手机号授权登陆
  loginByPhoneNo: ['/auth/wephone/login',                                     "POST", "common","server"],
  //获取用户信息
  getUserInfo: ['/user/app/user/info',"POST", "common","server"],
  //利用code登录接口
  loginByWeChatCode:            ['/auth/wecode/login',                                      "POST", "common","server"],
  //首次更新用户信息
  updateUserInfo: ['/cbase/updateUser',"POST", "common","server"],
  //以后更新用户信息
  updateUserInfoTwo:            ['/user/app/updateUserInfo',                                "POST", "login","server"],
  //获取商品详情的代金券列表
  getProducts:                  ['/merchant/app/product/list',                              "POST", "common","server"],
  //获取城市的分类列表
  getCategories:            ['/merchant/app/getCityCategories',                         "POST", "common","server"],
  //获取我能使用的优惠券
  getCanUseCouponList:          ['/merchant/app/coupon/getCanUseCouponList',                "POST", "login","server"],
  //订单列表
  getOrders:                    ['/order/app/getOrders',                                    "POST", "login","server"],
  //订单列表详情
  getOrderDetail:               ['/order/app/order/detail',                                 "POST", "login","server"],
  //广告位的接口
  advertcontent: ["/multitable/mainapi/lists/advertcontent", "GET", "common","server"],
  //事件日志的监听踩点
  addEventLog: ["/ums/uapi/eventLog", "POST", "common","server"],
  //申请退款
  orderRefund:                  ["/order/app/refund",                                       "POST", "login", "server"],
  //获取订单退款列表
  getRefundList:                ["/order/app/getRefundList",                                "POST", "login", "server"],
  //获取订单退款详情
  getRefundDetail:              ["/order/app/getRefundDetail",                              "POST", "login", "server"],
  //购买优惠买单单独
  submitOrder:                  ["/order/app/submitOrder",                                  "POST", "login", "server"],
  //购买普通商品
  submitProductOrder:           ["/order/app/submitProductOrder",                           "POST", "login", "server"],
  //生成预支付单
  prePay:                       ["/order/app/PrePay",                                       "POST", "login", "server"],
};
module.exports.apiPath = apiPath;