/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2017-08-11 09:03:57
 * @modify date 2017-08-11 09:03:57
 * @desc [login mock]
*/

import { param2Obj } from 'utils'

const mockUsers = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    username: '管理员'
  },
  user: {
    roles: ['user'],
    token: ['user'],
    username: '游客'
  }
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    if (mockUsers[username]) {
      return {
        code: 0,
        errMsg: '',
        data: mockUsers[username]
      }
    }
    return {
      code: -1,
      errMsg: '用户不存在',
      data: null
    }
  },
  logout: () => {
    return {
      code: 0,
      errMsg: '',
      data: null
    }
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (mockUsers[token]) {
      return {
        code: 0,
        errMsg: '',
        data: mockUsers[token]
      }
    }
    return {
      code: 10004, // TODO，根据实际情况修改
      errMsg: 'auth fail',
      data: null
    }
  }
}
