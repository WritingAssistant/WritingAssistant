import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import axios from 'axios'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ 
   console.log('需要登录');
   if (localStorage.token) { //token存在与否
   }
   else {
    next({
     path: '/homepage',
     query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
   }
  }
  else {
   next();
  }
 });
