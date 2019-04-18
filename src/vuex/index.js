import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

// 初始化时用localStorage.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: window.localStorage.getItem('token'),
  userName: window.localStorage.getItem('userName'),
  nickName: window.localStorage.getItem('nickName'),
  grade: window.localStorage.getItem('grade'),
  breadList: [],
  userType: window.localStorage.getItem('userType')
}

const getters = {
  breadList () {
    return state.breadList
  },
  isManager () {
    return state.userType === 'manager'
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
