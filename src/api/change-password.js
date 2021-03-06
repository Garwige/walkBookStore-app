import req from '../fetch/index.js'

const config = {
  // 查询列表详情
  updatePassword: {
    // 客户端请求地址
    url: '/app/userInformation/updatePassword',
    // HTTP请求方式
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
