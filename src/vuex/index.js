import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

// 初始化时用localStorage.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: window.localStorage.getItem('token'),
  userName: '',
  grade: window.localStorage.getItem('grade'),
  breadList: []
}

const getters = {
  breadList () {
    return state.breadList
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
