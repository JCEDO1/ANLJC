import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../pages/Login.vue'
// import GameManager from '../pages/GameManager.vue'
// import NavMenu from '../components/NavMenu.vue'
// import Nav from '../components/Nav.vue'
//
// import AgeSet from '../pages/AgeSet.vue'
// import GroupSet from '../pages/GroupSet.vue'
// import RuleSet from '../pages/RuleSet.vue'
// import UpLoad from '../pages/UpLoad.vue'
// import SingleSign from '../pages/SingleSign.vue'

import ErrorPage from '../components/404.vue'

import Store from '../store'
import {Message} from 'element-ui'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('../pages/Login.vue')))
const GameManager = r => require.ensure([], () => r(require('../pages/GameManager.vue')))
const NavMenu = r => require.ensure([], () => r(require('../components/NavMenu.vue')))
const Nav = r => require.ensure([], () => r(require('../components/Nav.vue')))
const AgeSet = r => require.ensure([], () => r(require('../pages/AgeSet.vue')))
const GroupSet = r => require.ensure([], () => r(require('../pages/GroupSet.vue')))
const RuleSet = r => require.ensure([], () => r(require('../pages/RuleSet.vue')))
const UpLoad = r => require.ensure([], () => r(require('../pages/UpLoad.vue')))
const SingleSign = r => require.ensure([], () => r(require('../pages/SingleSign.vue')))
const UpLoadAll = r => require.ensure([], () => r(require('../pages/UpLoadAll.vue')))
const Order = r => require.ensure([], () => r(require('../pages/Order.vue')))
const Sign = r => require.ensure([], () => r(require('../pages/Sign.vue')))
const UEditor = r => require.ensure([], () => r(require('../pages/UEditor.vue')))



// const Login = () => import('@/pages/Login.vue')



var sessionStorage = window.sessionStorage;
const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/T',
      name:'T',
      component:UEditor
    },
    {
      path: '/Login',
      name: 'Login',
      component:Login
    },{
      path:'/GameManager',
      name:'GameManager',
      component:GameManager
    },{
      path:'/NavMenu',
      name:'NavMenu',
      component:NavMenu
    },{
      path:'/Nav',
      name:'Nav',
      component:Nav,
      children:[
        {
          path:'/Nav/AgeSet',
          name:'AgeSet',
          component:AgeSet,
        },{
          path:'/Nav/GroupSet',
          name:'GroupSet',
          component:GroupSet
        },{
          path:'/Nav/RuleSet',
          name:'RuleSet',
          component:RuleSet
        },{
          path:'/Nav/UpLoad',
          name:'UpLoad',
          component:UpLoad,

        },{
          path:'/Nav/SingleSign',
          name:'SingleSign',
          component:SingleSign
        },{
          path:'/Nav/UpLoadAll',
          name:'UpLoadAll',
          component:UpLoadAll
        },{
          path:'/Nav/Order',
          name:'Order',
          component:Order
        },{
          path:'/Nav/Sign',
          name:'Sign',
          component:Sign
        }
      ]
    },
  ]
})

// router.afterEach((to,from)=>{
//   if(from.name != 'Login'){
//     let sessionStorageIsLoginState = sessionStorage.getItem('isLoginState');
//     if(sessionStorageIsLoginState!=null&&sessionStorageIsLoginState!=''&&sessionStorageIsLoginState==='1'){
//       Store.state.isLogin = 1;
//     }
//   }
//
// })
//
// router.beforeEach((to,from,next)=>{
//   if(to.name !== 'Login'){
//     if(Store.state.isLogin == 1){
//       next();
//     }else if(Store.state.isLogin == 0){
//       next({path:'/Login'});
//       return
//     }
//   }else{
//     next();
//   }
//
// })




export default router
