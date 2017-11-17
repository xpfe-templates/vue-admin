/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 09:26:57
 * @modify date 2017-08-03 09:26:57
 * @desc [token操作]
*/

// 根据需要选择localStorage还是cookies
// localstorage
import storage from 'xp-storage'
import tokenKey from '@/appConfig'

export function getToken () {
  return storage.get(tokenKey)
}

export function setToken (token) {
  return storage.set(tokenKey, token)
}

export function removeToken () {
  return storage.remove(tokenKey)
}

// cookies
// import Cookies from 'js-cookie'
// import tokenKey from '@/appConfig'

// export function getToken () {
//   return Cookies.get(tokenKey)
// }

// export function setToken (token) {
//   return Cookies.set(tokenKey, token)
// }

// export function removeToken () {
//   return Cookies.remove(tokenKey)
// }
