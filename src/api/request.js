/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2017-11-16 08:23:36
 * @desc [axios改造]
*/

import axios from 'axios'
import store from '@/store'
import router from '@/router'
import appConfig from '@/appConfig'

// 创建axios实例
const service = axios.create({
  baseURL: appConfig.baseURL,
  timeout: 10 * 1000,
  withCredentials: process.env.NODE_ENV !== 'development', // 需要登录权限的要带cookie
})

// request拦截器
service.interceptors.request.use(config => {
  // 添加统一信息
  config.data = config.data || {}
  config.data.deviceInfo = appConfig.deviceInfo
  // 修正method
  if (config.requestMethod) {
    config.requestMethod = config.requestMethod.toLocaleLowerCase()
  }
  if (config.requestMethod === 'get') {
    config.params = config.data
    config.data = {}
  }
  config.method = config.requestMethod || 'post'
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // success表示业务成功，直接resolve
    if (res.success) {
      return Promise.resolve(res)
    }
    // 没有权限
    // if (res.codeNum === appConfig.authErrorCode) {
    //   store.dispatch('FeLogOut')
    //   .then(() => {
    //     router.push({ path: '/login' })
    //   })
    //   return Promise.reject(res)
    // }
    return Promise.reject(res)
  },
  error => {
    console.log('err:' + error)
    return Promise.reject({ codeDesc: '系统异常' })
  }
)

export default service
