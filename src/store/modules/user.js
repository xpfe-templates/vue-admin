/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2017-10-23 03:40:08
 * @desc [用户store，主要放置用户相关]
*/

import md5 from 'js-md5'
import api from '@/api/urls'
import request from '@/api/request'
import appConfig from '@/appConfig'
import { deepClone } from 'xp-utils'
import storage from 'xp-storage'

const user = {
  state: {
    accessToken: '', // 用户token
    userInfo: {},
  },

  mutations: {
    SET_TOKEN (state, data) {
      state.accessToken = data
    },
    SET_USERINFO (state, data) {
      state.userInfo = data
    },
  },

  actions: {
    // 登录
    Login ({ commit }, data) {
      data = deepClone(data) // 需要修改输入参数，深拷贝
      data.userName = data.userName.trim()
      data.pwd = md5(data.pwd)
      data.operateClientId = appConfig.clientId
      data.redirectUri = appConfig.redirectUri

      return request({
        baseURL: appConfig.authUrl,
        url: api.login,
        data,
      })
      .then(res => {
        const backRes = res.value
        commit('SET_TOKEN', backRes.accessToken)
        return request({
          url: api.loginback,
          data: backRes,
        })
      })
      .then(() => {
        return this.dispatch('GetUserInfo')
      })
    },
    // 获取用户信息
    GetUserInfo ({ commit, state}) {
      if (storage.get('user')) {
        commit('SET_USERINFO', storage.get('user'))
        return new Promise((resolve) => { resolve() })
      }
      return request({
        url: api.getUserInfo,
      })
      .then(userRes => {
        commit('SET_USERINFO', userRes.value)
        storage.set('user', userRes.value)
        return userRes
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return request({
        url: api.logout,
      })
      .then(res => {
        commit('SET_USERINFO', {})
        storage.remove('user')
        return res
      })
    },
  }
}

export default user
