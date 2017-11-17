/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-24 10:47:03
 * @modify date 2017-09-27 02:58:08
 * @desc [权限]
*/

import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式

const needPermission = false // 是否需要鉴权生成路由
const whiteList = ['/login', '/404'] // 不重定向白名单

// router进入前钩子，判断权限
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  // 因为404在async路由，需要hack
  if (to.matched.length === 0) {  // 因为404在async路由，需要hack
    next({ path: '/404' })
  }
  // 不需要权限，直接可以访问
  if (!needPermission) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 白名单路由，直接进入
      next()
    } else {
      // TODO 动态生成路由
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
