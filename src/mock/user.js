/**
 * @author [author]
 * @email [example@mail.com]
 * @create date 2017-08-11 09:03:57
 * @modify date 2017-09-27 02:56:47
 * @desc [用户mock]
*/

const mockUsers = {
  admin: {
    accessToken: 'admin',
    userName: '管理员',
    email: 'admin@startdt.com',
    avatar: 'https://static.excaliburhan.com/demo/img-test-face.jpg',
  },
  user: {
    accessToken: 'user',
    userName: '游客',
    email: 'guest@startdt.com',
    avatar: 'https://static.excaliburhan.com/demo/img-test-face.jpg',
  },
}

export default {
  login: config => {
    const { userName } = JSON.parse(config.body)
    if (mockUsers[userName]) {
      return {
        code: 200,
        errorMsg: '',
        data: mockUsers[userName],
      }
    }
    return {
      code: -1,
      errorMsg: '用户不存在',
      data: null,
    }
  },
  loginback: config => {
    return {
      code: 200,
      errorMsg: '',
      data: null,
    }
  },
  getUserInfo: config => {
    return {
      code: 200,
      errorMsg: '',
      data: mockUsers['admin'],
    }
  },
  logout: () => {
    return {
      code: 200,
      errorMsg: '',
      data: null,
    }
  },
}
