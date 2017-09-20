/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2017-08-11 09:03:49
 * @modify date 2017-08-11 09:03:49
 * @desc [mock入口]
*/

import Mock from 'mockjs'
import userAPI from './user'

// 登录相关
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/user\/info\.*/, 'post', userAPI.getUserInfo)

export default Mock
