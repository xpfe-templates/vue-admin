/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 04:08:32
 * @modify date 2017-06-06 04:08:32
 * @desc [全局filters过滤器]
*/

// 格式化json
export function json (value) {
  return JSON.stringify(value, null, 2)
}

// 千分位
export function thousands (num) {
  if (num === undefined) return '--'
  num = num.toString()
  let float = ''
  const isFloat = num.indexOf('.') > -1
  if (isFloat) {
    const arr = num.split('.')
    num = arr[0]
    float = '.' + arr[1]
  }
  return num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + float
}

// 百分比
export function percent (num, fixed = 1) {
  if (num === undefined) return '--'
  return (num * 100).toFixed(fixed) + '%'
}
