//注意，后端所有的错误状态提示全部要配置在这里面
const errorCode = {
  "EntityNotExist.User": "",
  "EntityNotExist.Employee": "用户不存在",
  "EntityNotExist.Employee.Empty": "用户不存在",
  "EntityAlreadyExists.VerifyCode.Exist": "验证码获取频繁，请稍后再试",
  "EntityNotExist.VerifyCode.Empty": "验证码错误",
  "EntityNotExist.VerifyCode.Expired": "验证码错误",

  "EntityNotExist.Product": "验证失败，卷码无效",
  "EntityNotExist.Merchant": "验证失败，非此商家卷码",
  "InvalidParameter.ProductSn.Range": "验证失败，卷码过期",
  "InvalidParameter.ProductSn.Status": "验证失败，券码已被使用",
  "LimitExceeded.Order.Repeat": "当前存在未取消订单，请稍后重试",
  "LimitExceeded.Merchant.Status": "当前店铺已下架，请查看其他商品",
  "EntityNotExist.Product.NotExist": "当前商品不存在，请查看其他商品",
  "EntityNotExist.Merchant.NotExist": "当前店铺不存在，请查看其他商品",
  "EntityNotExist.GroupBooking.NotExist": "拼团信息不存在",
  "EntityNotExist.totalIssueQuantity.isBigSize": "劵库存不足",
  "EntityNotExist.couponInstance.notExist": "领取失败",
  "LimitExceeded.BookTime.NotAllowed": "预订时间不可用",

  "InvalidParameter.ProductSn.Invalid": "代金券已核销",
  "EntityNotExist.ProductQuantity.Empty": "当前商品无库存",
  "InvalidParameter.orderId.Empty": "当前存在退款中订单，请稍后重试",
  "EntityNotExist.Coupon": "兑换码有误",
  "EntityAlreadyExist.coupon.isNotUse":"您已领取该红包，请优先使用",

  // 点餐
  "LockException.DishShopCart.Status": "当前正在买单中，请勿操作",
  "IllegalStatus.DishSumPrice.Range": "菜品金额错误，请核对或重新下单",
  "Lock.DishShopCart.Status": "", // "点餐状态异常",
  "InvalidParameter.ActualMoney.Range": "付款金额错误，请核对或重新下",

  // join 加入点餐 时可能报错 
  "LimitExceeded.Order.Range": "聊天会话已经销毁",

  "EntityNotExist.DishShopCart.Empty": "点餐房间不存在",

  // "Lock.dishShopCartLock:1385551261400719360": "当前正在买单中，请勿重复买单",
  "Lock.dishShopCartLock": "当前正在买单中，请勿重复买单",
  "Inactive.Merchant.NotAllowed": "店铺点餐服务未开启",
  "Inactive.Book.NotAllowed": "店铺预订服务未开启",

  // 用户已经是PLUS，但是该是勾选了打包
  "InvalidParameter.isPackagePlus.NotAllowed":
    "您已经是爱享会员了，无需再次打包购买",

  // 优惠买单 金额输入错误 （0）
  "InvalidParameter.TotalMoney.Range": "输入金额错误，请检查",

  // 海报生成截图错误
  "HotScreen.Reslut.Error": "生成海报错误",

  "EntityAlreadyExists.Mobile.Repeat": "手机号已存在",
  "InvalidParameter.Mobile.Format": "手机号格式错误",
  "InvalidParameter.VerifyCode.Invalid": "验证码错误",

  "InvalidParameter.reason.Empty":"请选择申请退款原因",

};

module.exports.errorCode = errorCode;