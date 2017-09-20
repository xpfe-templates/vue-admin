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
import * as filters from 'utils/filters'
import './components' // 引入全局组件
import 'normalize.css/normalize.css' // normalize.css 样式格式化
import 'assets/css/index.scss' // 全局样式文件
import './errLog' // 错误日志
import './permission' // 权限
import './mock' // 使用mockjs代理请求

// 注册全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false // 取消启动时的提示

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
