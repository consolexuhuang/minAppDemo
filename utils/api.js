import ajax from './request'
export const getlist = params => {
  return ajax.request({
    url:'/merchant/app/merchant/getListNews',
    method:'post',
    data:params
  })
}
export const login = params => {
  return ajax.request({
    url:'authorizationLite',
    method:'post',
    data:params
  })
}