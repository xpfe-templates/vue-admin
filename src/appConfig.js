/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-10-16 11:16:57
 * @modify date 2017-11-16 08:26:01
 * @desc [配置信息]
*/

const env = process.env.NODE_ENV

// 用户自动部署目录，必须和git目录或者jenkins的创建目录一致，影响路由
const gitDir = 'vue-admin'
let htmlTitle = 'Vue Admin - dev'

// auth相关
const clientId = '' // 应用名称
const redirectUri = '' // auth登录跳转链接
const authCodes = [2003] // 没有权限的错误码
let authUrl = 'http://116.62.148.115:8082' // auth接口

// api相关
let baseUrl = 'http://apitest.example.com' // api接口

// 前期mock，联调时候注释
baseUrl = 'https://www.easy-mock.com/mock/5a0bf56bdbfe9e4cbd641706/unmanned'
authUrl = 'https://www.easy-mock.com/mock/59f02babb120c445fab92be2/account'

if (env === 'production') { // 生产环境
  htmlTitle = 'Vue Admin'
  authUrl = 'https://auth.startdtapi.com'
  baseUrl = 'http://api.example.com'
} else if (env === 'testing') { // 测试环境
  htmlTitle = 'Vue Admin - test'
  authUrl = 'http://116.62.148.115:8082'
  baseUrl = 'http://apitest.example.com'
}

module.exports = {
  gitDir,
  htmlTitle,
  baseUrl,
  clientId,
  redirectUri,
  authCodes,
  authUrl,
}
