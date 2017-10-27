/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2017-10-23 03:40:08
 * @desc [用户store，主要放置用户相关]
*/

import md5 from 'js-md5'
import api from 'api/urls'
import request from 'api/request'
import appConfig from '@/appConfig'
import { getToken, setToken, removeToken } from 'utils/auth' // setToken removeToken
import { deepClone } from 'xp-utils'

const user = {
  state: {
    accessToken: getToken(), // 用户token
    userInfo: {}, // 用户信息
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    },
  },

  actions: {
    // 登录
    Login({ commit }, data) {
      data = deepClone(data) // 需要修改输入参数，深拷贝
      data.userName = data.userName.trim()
      data.pwd = md5(data.pwd)
      data.redirectUri = appConfig.redirectUri
      data.operateClientId = appConfig.operateClientId

      return request({
        baseURL: appConfig.authURL,
        url: api.login,
        data,
      })
      .then(res => {
        const resData = res.data
        setToken(resData.accessToken)
        commit('SET_TOKEN', resData.accessToken)
        return request({
          url: api.loginback,
          data: resData,
        })
      })
      .then(backRes => {
        return request({
          url: api.getUserInfo,
        })
      })
      .then(userData => {
        commit('SET_USERINFO', userData)
      })
    },
    // 获取用户信息
    GetUserInfo({ commit }) {
      return request({
        url: api.getUserInfo
      })
      .then(userData => {
        commit('SET_USERINFO', userData)
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return request({
        url: api.logOut
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
