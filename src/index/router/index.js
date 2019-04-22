import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path : '/home',
    redirect : '/'
  },{
    name: 'home',
    path: '/',
    component: resolve => require(['@index/views/Home'],resolve)
  },{
    name: 'production',
    path: '/production',
    component: resolve => require(['@index/views/Production'],resolve)
  },{
    name: 'archives',
    path: '/archives',
    component: resolve => require(['@index/views/Archives'],resolve)
  },{
    name: 'about',
    path: '/about',
    component: resolve => require(['@index/views/About'],resolve)
  },{
    name: 'article',
    path: '/article/:id',
    component: resolve => require(['@index/views/Article'], resolve)
  },{
    name: '404',
    path: '*',
    component: resolve => require(['@index/views/Page_404'], resolve)
  }]
})
