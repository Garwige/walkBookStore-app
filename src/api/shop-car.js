import req from '../fetch/index.js'

const config = {
  // 查询购物车
  listShoppingCarts: {
    // 客户端请求地址
    url: '/app/clientShopCart/listShoppingCarts',
    // HTTP请求方式
    method: 'post'
  },
  // 修改购物车
  updateShoppingCart: {
    // 客户端请求地址
    url: '/app/clientShopCart/updateShoppingCart',
    // HTTP请求方式
    method: 'post'
  },
  // 删除购物车
  deleteShoppingCart: {
    // 客户端请求地址
    url: '/app/clientShopCart/deleteShoppingCart',
    // HTTP请求方式
    method: 'post'
  },
  // 新增订单
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
