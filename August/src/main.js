// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

var sessionStorage = window.sessionStorage;
import Store from './store/index.js'
//拦截

//axios封装
//http://192.168.191.1:8080     http://47.106.15.217:81
axios.defaults.baseURL = 'http://47.106.15.217:81';
axios.timeout = 1000;

const get = (url,params) =>{
  return new Promise((resolve,reject)=>{
    axios.get(url,{params:params})
      .then(res=>{
        resolve(res.data);
      }).catch(err=>{
        reject(err);
    })
  })
};
const post = (url,params) =>{
  return new Promise((resolve,reject)=>{
    axios.post(url,params)
      .then(res=>{
        resolve(res.data);
      }).catch(err=>{
      reject(err);
    })
  })
};

Vue.prototype.$get = get;
Vue.prototype.$post = post;

/*=============================获取本地数据并提交==================================================*/
const getLocalData = ()=>{
  var localAgeData = sessionStorage.getItem('localAgeData');

  if(localAgeData!=''&&localAgeData!=null){
    Store.commit('changeGlobalAgeData',JSON.parse(localAgeData));
  }


  var localSignedData = JSON.parse(sessionStorage.getItem('localSignedData'));

  setTimeout(function () {
    if(localSignedData!='' && localSignedData!=null){
      Store.commit('cleanItemGroupData');
      localSignedData.forEach(v=>{
        if(v.match_id == store.state.matchId){

          Store.commit('changeItemGroupData',v);
        }else{
          console.log(v.match_id);
          Vue.Message({
            message:'数据错误',
            type:'error'
          })
        }
      })
    }
  },0)
}
Vue.prototype.$getLocalData = getLocalData;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})


//axios封装 $get\$post直接引用 不需要加.catch
