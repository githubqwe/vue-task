// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import myaxios from '@/assets/js/axios.js'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(myaxios)
// 统一设置请求头
axios.interceptors.request.use(function(config){
  if (config.url !== '/login') {
    config.headers['Authorization']= window.localStorage.getItem('token')
  }
  return config
  
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
