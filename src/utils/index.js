/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-11 04:15:24
 * @modify date 2017-08-11 04:15:24
 * @desc [utils工具函数]
*/

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  const regSearch = decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')
  return JSON.parse('{"' + regSearch + '"}')
}
