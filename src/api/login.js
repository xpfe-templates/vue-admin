/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-11 02:54:49
 * @modify date 2017-08-11 02:54:49
 * @desc [login api]
*/

import fetch from 'utils/axios'

export function login (username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout () {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo (token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
