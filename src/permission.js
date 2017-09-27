/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-24 10:47:03
 * @modify date 2017-09-27 02:58:08
 * @desc [权限]
*/

import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式
import { getToken } from 'utils/auth' // 验权

const needPermission = false // 是否需要鉴权生成路由

// 权限判断
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
          store.dispatch('GetUserInfo')
          .then(res => { // 拉取userInfo
            const { roles } = res
            store.dispatch('GenerateRoutes', { roles })
            .then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to }) // hack方法 确保addRoutes已完成
            })
            .catch(() => {})
          })
          .catch(() => {
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
