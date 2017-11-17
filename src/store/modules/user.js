/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:05:04
 * @modify date 2017-10-23 03:40:08
 * @desc [用户store，主要放置用户相关]
*/

import md5 from 'js-md5'
import request from 'api/request'
import urls from 'api/urls'
import appConfig from '@/appConfig'
import { deepClone } from 'xp-utils'

const user = {
  state: {
    accessToken: '', // 用户token
    userInfo: {
      avatar: '//startdtadmin.oss-cn-hangzhou.aliyuncs.com/img/1508394711614.jpg', // 默认头像
    },
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.accessToken = data
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
        url: urls.login,
        data,
      })
      .then(res => {
        const backRes = res.value.data
        commit('SET_TOKEN', backRes.accessToken)
        return request({
          url: urls.loginback,
          data: backRes,
        })
      })
      .then(() => {
        return this.dispatch('GetUserInfo')
      })
    },
    // 获取用户信息
    GetUserInfo({ commit, state}) {
      return request({
        url: urls.getUserInfo,
      })
      .then(userRes => {
        if (!state.accessToken) { // 如果直接访问不经过login，防止router钩子死循环
          commit('SET_TOKEN', 'noToken')
        }
        commit('SET_USERINFO', userRes.value.data)
        return userRes
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return request({
        url: urls.logOut,
      })
    },
    // 前端登出，删除token
    FeLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        resolve()
      })
    },
  }
}

export default user
