import req from '../fetch/index.js'

const config = {
  // 查询订单列表
  listOrder: {
    // 客户端请求地址
    url: '/app/clientOrder/listOrder',
    // HTTP请求方式
    method: 'post'
  },
  // 修改订单列表
  updateOrderState: {
    // 客户端请求地址
    url: '/app/clientOrder/updateOrderState',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
