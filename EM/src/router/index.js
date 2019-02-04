import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/common/home.vue'
import UserList from '@/components/page/userlist.vue'  // 用户列表

// 按需引入message弹框
import {Message } from 'element-ui';
Vue.use(Router)


var router =  new Router({
  routes: [
  {name:'login' , path:'/login', component:Login},
  {name:'home' , path:'/home', component:Home,children:[
    {name:'users' , path:'/users', component:UserList}
  ]},
  
  ]
})
export default router
// 导航守卫
router.beforeEach(function (to, from, next) {
  if (to.path !== '/login') {
    if (!window.localStorage.getItem('token')){
      Message.error('请登录')
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})