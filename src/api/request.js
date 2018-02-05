/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 12:05:37
 * @modify date 2018-01-29 10:26:16
 * @desc [axios改造]
*/

import axios from 'axios'

// import router from '@/router'
import appConfig from '@/appConfig'

// 创建axios实例
const service = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 10 * 1000,
  withCredentials: true, // 需要登录权限的要带cookie
})
const CancelToken = axios.CancelToken
let cancel

// request拦截器
service.interceptors.request.use(
  config => {
    // 是否在ajaxing中的判断，同请求只允许存在一个
    if (config.oneAjax) {
      // 每次需要重新生成，防止首次请求被cancel
      config.cancelToken = new CancelToken((c) => {
        cancel = c
      })
      if (!window.oneAjax) window.oneAjax = {}
      if (window.oneAjax[config.url]) { // 已经有一个再执行，下一个直接cancel
        cancel()
      }
      window.oneAjax[config.url] = true
    }
    // 修正method，默认为post
    if (config.requestMethod) {
      config.requestMethod = config.requestMethod.toLocaleLowerCase()
    }
    config.method = config.requestMethod || 'post'
    // 添加统一信息
    config.data = config.data || {}
    if (config.method === 'get') {
      config.params = config.data
      config.data = {}
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    // 兼容auth老系统代码
    if (res.code !== undefined) { // 这是auth系统的老代码
      res = {
        success: res.code === 200,
        codeNum: res.code,
        codeDesc: res.msg || res.errorMsg,
        value: res.data,
      }
    } else {
      // 兼容value=""的情况，如果isArray存在，代表默认的返回是[]
      if (!res.value) {
        res.value = response.config.isArray ? [] : {}
      }
    }
    // 是否在ajaxing中的判断，同请求只允许存在一个
    if (response.config.oneAjax) {
      if (!window.oneAjax) window.oneAjax = {}
      window.oneAjax[response.config.url] = false
    }
    // debug 打印结果
    if (response.config.console) {
      console.log('url:', response.config.url)
      console.log('res:', res.value)
    }
    // success表示业务成功，直接resolve
    if (res.success) {
      return Promise.resolve(res)
    }
    // 没有权限
    if (appConfig.authCodes.includes(res.codeNum)) {
      // 跳转登录
      // router.push({ path: '/login' })
      // 跳转账户中心登录
      let tempUrl = location.href
      if (tempUrl.charAt(tempUrl.length - 1) === '/') {
        tempUrl = tempUrl.substr(0, tempUrl.length - 1)
      }
      let encodeUrl = encodeURIComponent(tempUrl)
      location.href = `${appConfig.accountUrl}?clientId=${appConfig.clientId}&redirectUrl=${appConfig.redirectUrl}&redirectUri=${encodeUrl}/#/login`
    }
    return Promise.reject(res)
  },
  error => {
    // 已经被cancel的请求会到error中
    if (axios.isCancel(error)) {
      return Promise.reject({
        success: false,
        codeNum: -1,
        codeDesc: '请求中',
        value: {},
      })
    } else if (error.config.oneAjax) { // 初始化window.oneAjax对象
      if (!window.oneAjax) window.oneAjax = {}
      window.oneAjax[error.config.url] = false
    }
    // debug 打印结果
    if (error.config.console) {
      console.log('url:', error.config.url)
      console.log('res:', error.value)
    }
    return Promise.reject({ codeDesc: '系统异常' })
  }
)

export default service
