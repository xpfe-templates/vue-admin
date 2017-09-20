/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2017-08-11 09:03:57
 * @modify date 2017-08-11 09:03:57
 * @desc [login mock]
*/

// import { param2Obj } from 'utils'

const mockUsers = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    username: '管理员',
    avatarUrl: 'https://static.excaliburhan.com/demo/img-test-face.jpg',
  },
  user: {
    roles: ['user'],
    token: 'user',
    username: '游客',
    avatarUrl: 'https://static.excaliburhan.com/demo/img-test-face.jpg',
  },
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    if (mockUsers[username]) {
      return {
        code: 0,
        errorMsg: '',
        data: mockUsers[username],
      }
    }
    return {
      code: -1,
      errorMsg: '用户不存在',
      data: null,
    }
  },
  logout: () => {
    return {
      code: 0,
      errorMsg: '',
      data: null,
    }
  },
  getUserInfo: config => {
    const { token } = JSON.parse(config.body)
    if (mockUsers[token]) {
      return {
        code: 0,
        errorMsg: '',
        data: mockUsers[token],
      }
    }
    return {
      code: 10004, // TODO，根据实际情况修改
      errorMsg: 'auth fail',
      data: null,
    }
  }
}
