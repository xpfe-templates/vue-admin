/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-10-16 11:16:57
 * @modify date 2017-10-16 11:16:57
 * @desc [配置信息]
*/

const env = process.env.NODE_ENV

const tokenKey = 'admin-token'
let htmlTitle = 'Vue Admin - dev'
let baseURL = 'https://www.easy-mock.com/mock/59eff97c7af0b52dd53c60ae/screen'
let authURL = 'https://www.easy-mock.com/mock/59f02babb120c445fab92be2/account'

if (env === 'production') {
  htmlTitle = 'Vue Admin'
  baseURL = 'https://www.easy-mock.com/mock/59eff97c7af0b52dd53c60ae/screen'
  authURL = 'https://www.easy-mock.com/mock/59f02babb120c445fab92be2/account'
} else if (env === 'testing') {
  htmlTitle = 'Vue Admin - test'
  baseURL = 'https://www.easy-mock.com/mock/59eff97c7af0b52dd53c60ae/screen'
  authURL = 'https://www.easy-mock.com/mock/59f02babb120c445fab92be2/account'
}

module.exports = {
  tokenKey,
  htmlTitle,
  baseURL,
  authURL,
}
