// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入管理员登录状态的接口
import {loginRoot} from './api'

import '@/styles/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 管理登录接口调用
  loginRoot().then(res => {
    if (res.error !== 400 || to.path === '/login') {
      next()
    } else {
      next({path: '/login'})
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
