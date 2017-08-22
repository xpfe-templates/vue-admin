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
const TokenKey = 'Admin-Token'

export function getToken () {
  return storage.get(TokenKey)
}

export function setToken (token) {
  return storage.set(TokenKey, token)
}

export function removeToken () {
  return storage.remove(TokenKey)
}

// cookies
// import Cookies from 'js-cookie'
// const TokenKey = 'Admin-Token'

// export function getToken () {
//   return Cookies.get(TokenKey)
// }

// export function setToken (token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken () {
//   return Cookies.remove(TokenKey)
// }
