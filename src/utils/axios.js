/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2017-09-27 02:54:11
 * @desc [axios改造]
*/

import axios from 'axios'
import store from '@/store'
import router from '@/router'
import appConfig from '@/appConfig'

const CODE_SUCCESS = 200 // 请求成功

// 创建axios实例
const service = axios.create({
  baseURL: appConfig.baseURL,
  timeout: 10 * 1000,
  withCredentials: process.env.NODE_ENV !== 'development', // 需要登录权限的要带cookie
})

// request拦截器
service.interceptors.request.use(config => {
  // 添加统一信息
  if (!config.data) config.data = {}
  // config.data.deviceInfo = 'admin'
  // 采用入侵式传参，需要删除多余的入参
  config.method = config.data.requestMethod || 'post'
  delete config.data.requestMethod
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    // 根据系统的状态码写判断
    if (res.code === CODE_SUCCESS) {
      return Promise.resolve(res)
    }
    // 无权限需要重新登录
    if (res.code === 30002 || res.code === 30004) {
      store.dispatch('FeLogOut').then(() => {
        router.push({ path: '/login' })
      })
      return Promise.reject(res)
    }
    return Promise.reject(res)
  },
  error => {
    console.log('err:' + error)
    return Promise.reject({ errorMsg: '系统异常' })
  }
)

export default service
