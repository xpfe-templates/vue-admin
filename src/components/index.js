/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 07:46:07
 * @modify date 2017-08-03 07:12:20
 * @desc [全局组件文件]
*/

import Vue from 'vue'
import ElementUI from 'element-ui'
import Pagination from '@/components/Pagination'

import './theme/index.css'

Vue.use(ElementUI)

const components = [
  Pagination
]
components.forEach((component) => {
  Vue.component(component.name, component)
})
