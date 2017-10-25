/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 03:44:28
 * @modify date 2017-06-06 03:44:28
 * @desc [路由方法]
*/

import Vue from 'vue'
import Router from 'vue-router'
let env = 'development'
if (process.env.NODE_ENV !== 'development') {
  env = 'production'
}
const _import = require('./_import_' + env)

Vue.use(Router)

/**
 * icon: iconfont的名字
 * isSlash: 是否是首页"/"
 * hidden: 如果为`hidden: true`不在sidebar出现
 * redirect: 如果`redirect: noredirect`不会redirect
 * noDropdown: 如果`noDropdown: true`子路由不会在sidebar出现
 * meta: { role: ['admin'] }权限相关
*/

// 全局需要的layout页面
import Layout from 'views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  { path: '/401', component: _import('error/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // hidden: true,
    icon: 'home',
    isSlash: true,
    noDropdown: true,
    children: [
      { path: 'dashboard', component: _import('dashboard/index'), name: '首页' }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    name: '测试路由',
    icon: 'phone_iphone',
    children: [
      { path: 'index', component: _import('test/index'), name: '路由一', icon: 'phone' },
      { path: 'sub1', component: _import('test/sub1'), name: '路由二', icon: 'phone_forwarded' },
      { path: 'sub2', component: _import('test/sub2'), name: '路由三', icon: 'phone_in_talk' },
    ]
  },
]

export default new Router({
  mode: 'history', // 需要nginx支持，如果不需要暴露URL的，例如大屏，可以改为hash
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]

