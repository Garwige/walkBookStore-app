import req from '../fetch/index.js'

const config = {
  // 查询列表详情
  listManagerOrderDeepen: {
    // 客户端请求地址
    url: '/app/managerOrder/listManagerOrderDeepen',
    // HTTP请求方式
    method: 'post'
  },
  // 修改店长订单状态
  updateManagerOrderState: {
    // 客户端请求地址
    url: '/app/managerOrder/updateManagerOrderState',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
