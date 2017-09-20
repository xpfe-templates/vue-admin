/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2017-08-03 07:05:04
 * @desc [用户store，主要放置用户相关]
*/

import { login, logout, getUserInfo } from 'api/user'
import { getToken, setToken, removeToken } from 'utils/auth'

const user = {
  state: {
    userinfo: {}, // 用户信息
    token: getToken(), // 用户token
    roles: [], // 用户角色
  },

  mutations: {
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(res => {
          const data = res.data
          if (res.code === 0) {
            setToken(data.token)
            commit('SET_USERINFO', data)
            commit('SET_TOKEN', data.token)
            commit('SET_ROLES', data.roles)
            resolve(data)
          } else {
            reject(res.errorMsg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
        .then(res => {
          // 如果有具体业务逻辑，则在这里处理
          const data = res.data
          if (res.code === 0) {
            commit('SET_USERINFO', data)
            commit('SET_ROLES', data.roles)
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
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端登出
    FeLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
}

export default user
