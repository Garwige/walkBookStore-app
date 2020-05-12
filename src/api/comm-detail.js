import req from '../fetch/index.js'

const config = {
  // 查询商品信息详情
  getGoods: {
    // 客户端请求地址
    url: '/app/clientGoods/getGoods',
    // HTTP请求方式
    method: 'post'
  },
  // 加入购物车
  addShoppingCart: {
    // 客户端请求地址
    url: '/app/clientShopCart/addShoppingCart',
    // HTTP请求方式
    method: 'post'
  },
  // 立即购买
  addOrder: {
    // 客户端请求地址
    url: '/app/clientOrder/addOrder',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
