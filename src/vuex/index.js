import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

// 初始化时用localStorage.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: window.localStorage.getItem('token'),
  username: '',
  grade: window.localStorage.getItem('grade')

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
