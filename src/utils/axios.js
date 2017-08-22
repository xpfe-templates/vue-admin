/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2017-08-03 12:05:37
 * @desc [axios改造]
*/

import axios from 'axios'
import store from '../store'
import { getToken } from 'utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  // 添加统一的token信息
  // config.data.accesstoken = getToken() // 每个请求添加token参数
  if (store.getters.token) { // token加在headers里
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log('err' + error)
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    // 根据系统的状态码写判断
    if (res.code !== 0) {
      // 没有权限情况，code根据实际情况调整
      if (res.code === 10004) {
        store.dispatch('FeLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject(res.errMsg || '没有权限')
    }
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
