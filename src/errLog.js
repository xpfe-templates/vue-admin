/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-24 10:54:35
 * @modify date 2017-12-14 10:58:18
 * @desc [错误日志]
*/

import Vue from 'vue'
import { on } from 'xp-dom'
import errLog from '@/store/errLog'

// Vue错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = (err, vm) => {
    console.log(err, window.location.href)
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  }
}

// Script error
on(window, 'error', (msg, url, line, col, error) => {
  console.log('错误信息:', msg)
  console.log('出错文件:', url)
  console.log('出错行号:', line)
  console.log('出错列号:', col)
  console.log('错误详情:', error)
})

// Promise reject
on(window, 'unhandledrejection', (e) => {
  console.log('Promise not catch:', e.reason)
})
