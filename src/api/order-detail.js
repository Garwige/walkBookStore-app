import req from '../fetch/index.js'

const config = {
  // 查询列表详情
  listOrderDeepen: {
    // 客户端请求地址
    url: '/app/clientOrder/listOrderDeepen',
    // HTTP请求方式
    method: 'post'
  },
  // 修改用户订单状态
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
