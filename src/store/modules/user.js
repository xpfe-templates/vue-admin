/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2018-01-29 10:24:27
 * @desc [用户store]
*/

import store from 'xp-storage'

import api from '@/api/urls'
import request from '@/api/request'

const user = {
  state: {
    userInfo: {},
  },

  mutations: {
    SET_USERINFO (state, data) {
      state.userInfo = data
    },
  },

  actions: {
    // 获取用户信息
    GetUserInfo ({ commit, state}) {
      if (store.get('userinfo')) {
        commit('SET_USERINFO', store.get('userinfo'))
        return new Promise((resolve) => { resolve() })
      }
      return request({
        url: api.getUserInfo,
      })
      .then((res) => {
        commit('SET_USERINFO', res.value)
        store.set('userinfo', res.value)
        return res
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return request({
        url: api.logout,
      })
      .then(res => {
        commit('SET_USERINFO', {})
        store.remove('userinfo')
        return res
      })
    },
  }
}

export default user
