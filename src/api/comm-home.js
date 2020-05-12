import req from '../fetch/index.js'

const config = {
  // 查询轮播
  listRotationChartHome: {
    // 客户端请求地址
    url: '/app/clientHome/listRotationChartHome',
    // HTTP请求方式
    method: 'post'
  },
  // 查询热门商品
  listHotGoods: {
    // 客户端请求地址
    url: '/app/clientHome/listHotGoods',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
