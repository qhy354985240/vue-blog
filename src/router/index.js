import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { grade } from '@/constants'

// import Register from '@components/Register'
// import Home from '@components/Home.vue'

Vue.use(Router)
// 路由懒加载的部分
// 路由懒加载
const Login = resolve => {
  require.ensure(['../components/Login.vue'], () => {
    resolve(require('../components/Login.vue'))
  })
}

const Register = resolve => {
  require.ensure(['@components/Register.vue'], () => {
    resolve(require('@components/Register.vue'))
  })
}

const Home = resolve => {
  require.ensure(['@/view/home/index.vue'], () => {
    resolve(require('@/view/home/index.vue'))
  })
}

const Error = resolve => {
  require.ensure(['../components/404.vue'], () => {
    resolve(require('../components/404.vue'))
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
        auth: grade.Home
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      name: 'error',
      component: Error
    }
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  let token = store.state.token
  let grade = store.state.grade || 3
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else if (to.path === '/login' && token) {
    // 防止用户登录后输入url进入登录页
    next({ path: '/' })
  } else if (to.meta.auth && to.meta.auth > grade) {
    next({ path: '/error' })
  } else {
    next()
  }
})

router.afterEach(() => {
  Nprogress.done()
})

export default router
