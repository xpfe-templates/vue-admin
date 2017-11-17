/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-10-16 11:16:57
 * @modify date 2017-11-16 08:26:01
 * @desc [配置信息]
*/

const env = process.env.NODE_ENV

const tokenKey = 'admin-token'
const deviceInfo = '' // 应用信息
const authErrorCode = 3000 // 没有权限的错误码
let htmlTitle = 'Vue Admin - dev'
let baseURL = 'https://www.easy-mock.com/mock/5a0bf56bdbfe9e4cbd641706/unmanned'
let authURL = 'https://www.easy-mock.com/mock/59f02babb120c445fab92be2/account'

if (env === 'production') {
  htmlTitle = 'Vue Admin'
  baseURL = '//api.example.com'
  authURL = '//auth.example.com'
} else if (env === 'testing') {
  htmlTitle = 'Vue Admin - test'
  baseURL = '//apitest.example.com'
  authURL = '//authtest.example.com'
}

module.exports = {
  tokenKey,
  deviceInfo,
  authErrorCode,
  htmlTitle,
  baseURL,
  authURL,
}
