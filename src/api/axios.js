import axios from 'axios'
import router from '../router'
import store from '../vuex'
import { Upload } from 'element-ui'

// 设置全局axios默认值
axios.defaults.timeout = 6000 // 6000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const axiosToken = axios.create()
axiosToken.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use = axiosToken.interceptors.request.use

// request 拦截
axiosToken.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// response 拦截
axiosToken.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        store.dispatch('UserLogout') // 可能token过期，清除
        router.push({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
      }
    }
    return Promise.reject(err.response)
  }
)

// api接口
export default {
  // 用户注册
  userRegister (data) {
    return axiosToken.post('/api/user/register', data)
  },
  // 用户登录
  userLogin (data) {
    return axiosToken.post('/api/user/login', data)
  },
  // 获取用户
  getUser (data) {
    return axiosToken.post('/api/getUsers', data)
  },
  // 删除用户 单个
  delUser (data) {
    return axiosToken.post('/api/delUser', data)
  },

  // 删除用户 多个
  delUsers (data) {
    return axiosToken.post('/api/delUsers', data)
  },
  // 登录是否过期是否
  isLogin () {
    return axiosToken.get('/api/checkToken')
  },
  // 搜索用户多选
  searchUser (data) {
    return axiosToken.post('/api/searchUser', data)
  },

  // 更换头像
  Upload (data) {
    return axiosToken.post('/api/upload', data)
  }
}
