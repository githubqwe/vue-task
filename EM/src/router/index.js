import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/common/home.vue'
import UserList from '@/components/page/userlist.vue'  // 用户列表


Vue.use(Router)

export default new Router({
  routes: [
  {name:'login' , path:'/login', component:Login},
  {name:'home' , path:'/home', component:Home,children:[
    {name:'users' , path:'/users', component:UserList}
  ]},
  
  ]
})
