import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'

// import HelloWorld from '@/components/HelloWorld'
// import Register from '@components/Register'
import Hello from '@components/Hello.vue'

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

// const Hello = resolve => {
//   require.ensure(['../components/Hello.vue'], () => {
//     resolve(require('../components/Hello.vue'))
//   })
// }

const Error = resolve => {
  require.ensure(['../components/404.vue'], () => {
    resolve(require('../components/404.vue'))
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
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
  let token = store.state.token
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router
