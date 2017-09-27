/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2017-09-27 02:59:30
 * @desc [用户store，主要放置用户相关]
*/

import { login, loginback, logout, getUserInfo } from 'api/user'
import { getToken, setToken, removeToken } from 'utils/auth'
import md5 from 'js-md5'

const user = {
  state: {
    userInfo: {}, // 用户信息
    accessToken: getToken(), // 用户token
    userId: '', // 用户Id
    // roles: [], // 用户权限角色列表
  },

  mutations: {
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    },
    SET_TOKEN: (state, data) => {
      state.token = data
    },
    SET_USERID: (state, data) => {
      state.userId = data
    },
  },

  actions: {
    // 登录
    Login({ commit }, params) {
      return new Promise((resolve, reject) => {
        const userName = params.userName.trim()
        const encryptedPwd = md5(params.pwd)
        login(userName, encryptedPwd)
        .then(res => {
          if (res.code === 200) {
            const data = res.data
            setToken(data.token)
            commit('SET_TOKEN', data.accessToken)
            commit('SET_USERID', data.userId)
            loginback(data.accessToken, data.userId)
            .then(backRes => {
              if (backRes.code === 200) {
                getUserInfo()
                .then(userRes => {
                  const userData = userRes.data
                  if (userRes.code === 200) {
                    commit('SET_USERINFO', userData)
                    resolve(userData)
                  } else {
                    reject(userRes.errorMsg)
                  }
                })
                .catch(error => {
                  reject(error)
                })
              } else {
                reject(backRes.errorMsg)
              }
            })
            .catch(error => {
              reject(error)
            })
          } else {
            reject(res.errorMsg)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
        .then(res => {
          const data = res.data
          if (res.code === 200) {
            commit('SET_USERINFO', data)
            resolve(data)
          } else {
            reject(res.errorMsg)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
        .then(res => {
          const data = res.data
          if (res.code === 200) {
            commit('SET_TOKEN', '')
            commit('SET_USERID', '')
            removeToken()
            resolve(data)
          } else {
            reject(res.errorMsg)
          }
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    // 前端登出
    FeLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        removeToken()
        resolve()
      })
    },
  }
}

export default user
