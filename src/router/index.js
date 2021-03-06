/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 03:44:28
 * @modify date 2017-06-06 03:44:28
 * @desc [路由方法]
*/

import Vue from 'vue'
import Router from 'vue-router'

// 按需加载
const _import = file => () => import('@/views/' + file + '.vue').then(m => m.default)
Vue.use(Router)

/**
 * icon: iconfont的名字
 * isSlash: 是否是首页"/"，只有首页有这个参数
 * hidden: 如果为`hidden: true`不在sidebar出现
 * redirect: 如果`redirect: noredirect`不会redirect
 * noDropdown: 如果`noDropdown: true`子路由不会在sidebar出现
 * meta: {
 *   role: ['admin'], 权限相关
 *   parent: '/xxx', 子路由也会高亮父路由菜单，原则上需要`noDropdown: true`
 * }
*/

// 全局需要的layout页面
import Layout from '@/views/layout/Layout'

export const constMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('error/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // hidden: true,
    icon: 'widgets',
    isSlash: true, // 只在这里使用
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
    icon: 'dns',
    children: [
      { path: 'index', component: _import('test/index'), name: '路由一', icon: 'tag' },
      { path: 'sub1', component: _import('test/sub1'), name: '路由二', icon: 'tag' },
      { path: 'sub2', component: _import('test/sub2'), name: '路由三', icon: 'tag' },
    ]
  },
]

export default new Router({
  // history需要nginx支持
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constMap
})

export const asyncMap = [
  { path: '*', redirect: '/404', hidden: true }
]
