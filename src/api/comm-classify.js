import req from '../fetch/index.js'

const config = {
  // 查询一级商品分类
  listOneGoodsClassify: {
    // 客户端请求地址
    url: '/app/clientGoods/listOneGoodsClassify',
    // HTTP请求方式
    method: 'post'
  },
  // 查询二级商品分类
  listGetClassGoods: {
    // 客户端请求地址
    url: '/app/clientGoods/listGetClassGoods',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
