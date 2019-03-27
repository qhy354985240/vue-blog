import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { grade } from '@/constants'

// import Register from '@components/Register'
// import Home from '@components/Home.vue'
import UserManage from '@view/userManage/index.vue'
import ArticleManage from '@view/articleManage/index.vue'
import AddArticle from '@view/articleManage/views/add-article'
import ArticleList from '@view/articleManage/views/article-list'
import SortManage from '@view/articleManage/views/sort-manage'

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

const CommentsManage = resolve => {
  require.ensure(['@view/commentsManage/index.vue'], () => {
    resolve(require('@view/commentsManage/index.vue'))
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
      },
      children: [
        {
          path: '',
          redirect: 'usermanage'
        },
        {
          path: 'usermanage',
          name: 'usermanage',
          component: UserManage,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'articlemanage',
          name: 'articlemanage',
          component: ArticleManage,
          children: [
            { path: '', redirect: 'articlelist' },
            { path: 'addarticle', name: 'addarticle', component: AddArticle },
            { path: 'articlelist', name: 'articlelist', component: ArticleList },
            { path: 'sortmanage', name: 'sortmanage', component: SortManage }
          ]
        },
        { path: '/commentsManage', name: 'commentsManage', component: CommentsManage }

      ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '*', name: 'error', component: Error }
  ]
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  let token = store.state.token
  console.log(to)
  let grade = store.state.grade || 3
  console.log(to.meta.requiresAuth)
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      console.log('xxx')
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
