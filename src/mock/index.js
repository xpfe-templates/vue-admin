/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2017-08-11 09:03:49
 * @modify date 2017-08-11 09:03:49
 * @desc [mock入口]
*/

import Mock from 'mockjs'
import loginAPI from './login'

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.login)
Mock.mock(/\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

export default Mock
