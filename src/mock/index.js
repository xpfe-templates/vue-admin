/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2017-08-11 09:03:49
 * @modify date 2017-09-27 02:57:42
 * @desc [mock入口]
*/

import Mock from 'mockjs'
import userAPI from './user'

// 登录
Mock.mock(/\/login/, 'post', userAPI.login)
Mock.mock(/\/back/, 'post', userAPI.loginback)
Mock.mock(/\/auth\/user\/getPersonInfo/, 'post', userAPI.getUserInfo)
Mock.mock(/\/auth\/user\/logOut/, 'post', userAPI.logout)

export default Mock
