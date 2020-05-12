import req from '../fetch/index.js'

const config = {
  // 新增订单评价
  addGoodsEvaluate: {
    // 客户端请求地址
    url: '/app/clientOrder/addGoodsEvaluate',
    // HTTP请求方式
    method: 'post'
  },
  // 评价后改变订单状态
  updateOrderState: {
    // 客户端请求地址
    url: '/app/clientOrder/updateOrderState',
    // HTTP请求方式
    method: 'post'
  },
  // 查询订单评价
  listGoodsForEvaluate: {
    // 客户端请求地址
    url: '/app/clientOrder/listGoodsForEvaluate',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
