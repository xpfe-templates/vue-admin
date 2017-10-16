/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2017-09-27 02:54:11
 * @desc [axios改造]
*/

import axios from 'axios'
import store from '../store'
import router from '../router'
import appConfig from '@/appConfig'
// import { getToken } from 'utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: appConfig.baseURL,
  timeout: 10000,
  withCredentials: true, // 需要登录权限的要带cookie
})

// request拦截器
service.interceptors.request.use(config => {
  // 添加统一信息
  if (!config.data) config.data = {} // data没有传默认为{}
  config.data.deviceInfo = 'pc'
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
    if (res.code !== 200) {
      // 无权限需要重新登录
      if (res.code === 30002 || res.code === 30004) {
        store.dispatch('FeLogOut').then(() => {
          router.push({ path: '/login' })
        })
      }
      return Promise.reject(res.errorMsg || '没有权限')
    }
    return res
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
