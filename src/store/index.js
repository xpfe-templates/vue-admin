/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 03:44:42
 * @modify date 2017-08-03 06:04:07
 * @desc [store方法]
*/

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
  },
  getters
})

export default store
