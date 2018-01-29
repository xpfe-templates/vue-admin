/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-11 02:54:49
 * @modify date 2017-10-25 02:18:23
 * @desc [url列表]
*/

import appConfig from '@/appConfig'

export default {
  // auth-账号中心
  login: appConfig.authUrl + '/login',
  // 登录登出
  loginback: '/back',
  logout: '/logout',
  getUserInfo: '/auth/personInfo',
}
