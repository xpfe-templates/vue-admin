/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2017-09-27 02:59:30
 * @desc [用户store，主要放置用户相关]
*/

// import { login, loginback, logout, getUserInfo } from 'api/user'

import api from 'api/user'
import fetch from 'utils/axios'
import { getToken, setToken } from 'utils/auth' // setToken removeToken
import md5 from 'js-md5'
import { deepClone } from 'xp-utils'

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
    Login({ commit }, data) {
      data = deepClone(data)
      data.userName = data.userName.trim()
      data.pwd = md5(data.pwd)
      data.redirectUri = 'http://localhost:3000'
      data.operateClientId = 'startdt-admin'

      return fetch({
        baseURL: 'https://auth.startdtapi.com', // 调用账号中心
        url: api.login,
        data,
      })
        .then(res => {
          const resData = res.data
          setToken(resData.accessToken)
          commit('SET_TOKEN', resData.accessToken)
          commit('SET_USERID', resData.userId)
          return fetch({
            url: api.loginback,
            data: resData
          })
        })
        .then(backRes => {
          return fetch({
            url: api.getUserInfo
          })
        })
        .then(userData => {
          commit('SET_USERINFO', userData)
        })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return fetch({
        url: api.getUserInfo
      })
        .then(userData => {
          commit('SET_USERINFO', userData)
        })
    },
    // 登出
    LogOut({ commit, state }) {
      return fetch({
        url: api.logOut
      })
    },
    // 前端登出
    FeLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USERID', '')
        // removeToken()
        resolve()
      })
    },
  }
}

export default user
