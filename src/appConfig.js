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
const htmlTitle = 'Vue Admin'

// auth相关
let accountUrl = 'http://fetest.startdt.net/aishop-account' // 账号中心前端跳转地址
let authUrl = 'http://116.62.148.115:8082' // auth接口
const authCodes = [2003] // 没有权限的错误码
const clientId = '' // TODO 应用名称
let redirectUrl = '' // 账号中心api接口地址

// api相关
let baseUrl = 'http://apitest.example.com' // api接口

if (env === 'production') { // 生产环境
  accountUrl = ''
  authUrl = 'https://auth.startdtapi.com'
  redirectUrl = 'http://login.example.com/loginRedirect'
  baseUrl = 'http://api.example.com'
} else if (env === 'testing') { // 测试环境
  accountUrl = 'http://fetest.startdt.net/aishop-account'
  authUrl = 'http://116.62.148.115:8082'
  redirectUrl = 'http://testlogin.example.com/loginRedirect'
  baseUrl = 'http://apitest.example.com'
}

module.exports = {
  gitDir,
  htmlTitle,
  accountUrl,
  authUrl,
  authCodes,
  clientId,
  redirectUrl,
  baseUrl,
}
