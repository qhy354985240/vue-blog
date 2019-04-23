// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './axios'
import MetaInfo from 'vue-meta-info'

import {
  Icon,
  Pagination,
  Tag
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = api
Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Pagination)
Vue.use(Tag)

Vue.use(MetaInfo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})
