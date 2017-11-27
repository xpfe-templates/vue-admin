/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-10-16 11:16:57
 * @modify date 2017-11-16 08:26:01
 * @desc [配置信息]
*/

const env = process.env.NODE_ENV

const gitDir = 'vue-admin' // 用户自动部署目录，必须和git目录或者jenkins的创建目录一致，影响history路由
const clientId = '' // 应用名称
const redirectUri = '' // auth登录跳转链接
const authCodes = [2003] // 没有权限的错误码

let htmlTitle = 'Vue Admin - dev'
let baseUrl = 'https://www.easy-mock.com/mock/5a0bf56bdbfe9e4cbd641706/unmanned'
let authUrl = 'https://www.easy-mock.com/mock/59f02babb120c445fab92be2/account'

if (env === 'production') { // 生产环境
  htmlTitle = 'Vue Admin'
  baseUrl = '//api.example.com'
  authUrl = '//auth.example.com'
} else if (env === 'testing') { // 测试环境
  htmlTitle = 'Vue Admin - test'
  baseUrl = '//apitest.example.com'
  authUrl = '//authtest.example.com'
}

module.exports = {
  gitDir,
  clientId,
  redirectUri,
  authCodes,
  htmlTitle,
  baseUrl,
  authUrl,
}
