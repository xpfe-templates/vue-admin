/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 03:04:23
 * @modify date 2017-08-11 04:05:28
 * @desc [入口文件]
*/

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './utils/filters'
import './components' // 引入全局组件
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式
import 'normalize.css/normalize.css' // normalize.css 样式格式化
import 'public/css/index.scss' // 全局样式文件
import { getToken } from 'utils/auth' // 获取token
import './mock' // 使用mockjs代理请求

// 注册全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 权限判断
const needPermission = true // 是否需要鉴权
function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/authredirect', '/404'] // 不重定向白名单

// router进入前钩子，判断权限
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  // 不需要权限，直接可以访问
  if (!needPermission) {
    // 没有匹配则直接进入404
    if (to.matched.length === 0) {
      next({ path: '/404' })
    }
    next()
  } else {
    if (getToken()) {
      // 登录后URL输入到login页面，则直接跳转
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完userInfo信息
          store.dispatch('GetUserInfo').then(res => { // 拉取userInfo
            const roles = res.roles
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to }) // hack方法 确保addRoutes已完成
            })
          }).catch(() => {
            store.dispatch('FeLogOut').then(() => {
              next({ path: '/login' })
            })
          })
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          if (hasPermission(store.getters.roles, to.meta.role)) {
            next()
          } else {
            next({
              path: '/401', query: { noGoBack: true }
            })
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else if (to.matched.length === 0) { // 不匹配进入404
        next({ path: '/404' })
      } else {
        next('/login') // 否则全部重定向到登录页
        NProgress.done() // 在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
