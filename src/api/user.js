/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-11 02:54:49
 * @modify date 2017-09-27 03:11:33
 * @desc [login api]
*/

import fetch from 'utils/axios'

export function login (userName, pwd) {
  let data = { userName, pwd }
  data.redirectUri = 'http://localhost:3000'
  data.operateClientId = 'startdt-admin'
  return fetch({
    baseURL: 'http://192.168.2.202:8080', // 调用账号中心
    url: '/login',
    method: 'post',
    data,
  })
}

export function loginback (accessToken, userId) {
  const data = { accessToken, userId }
  return fetch({
    url: '/back',
    method: 'post',
    data,
  })
}

export function logout () {
  return fetch({
    url: '/auth/user/logOut',
    method: 'post',
  })
}

export function getUserInfo () {
  return fetch({
    url: '/auth/user/getPersonInfo',
    method: 'post',
  })
}
