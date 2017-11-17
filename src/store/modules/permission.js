/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-08-03 07:02:01
 * @modify date 2017-08-03 07:02:01
 * @desc [权限store，主要放置权限相关]
*/

import { asyncMap, constMap } from '@/router'

// 通过meta.role判断是否与当前用户权限匹配
function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  }
  return true
}

// 递归过滤异步路由表，返回符合用户角色权限的路由表
function filterRouter (asyncMap, roles) {
  const accesseRouters = asyncMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accesseRouters
}

const permission = {
  state: {
    routers: constMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({ commit }, params) {
      return new Promise(resolve => {
        const { roles } = params
        let accesseRouters
        if (!roles) { // 没有定义角色的系统，直接认为可以访问
          accesseRouters = asyncMap
        } else {
          accesseRouters = filterRouter(asyncMap, roles)
        }
        commit('SET_ROUTERS', accesseRouters)
        resolve()
      })
    },
  }
}

export default permission
