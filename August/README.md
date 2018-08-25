# 轮滑管理系统

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#功能说明

>登陆功能
 
 ```
  1、获取用户输入，发送请求验证。
    通过 - 进入赛事管理页面
    失败 - 反馈失败信息给用户
  2、所以页面内置退出按钮，可一退回登陆页面。
  3、赛事管理页面后退即可退回登陆页面。 
    
  Axios
    请求验证用户账号密码
    
  Vuex关联
    state - isLogin 是否登陆 0否 1是
    mutations - changeIsLogin （state,b） b为整型
 ```

>赛事选择

```
  1、获取赛事列表
    mounted - 挂载即获取
      成功 - 有数据
      失败 - 暂无数据
  2、新建赛事
     填写相应表单新建
  3、进入赛事
     点击查看按钮进入NavMenu
      （1）记录matchId、matchName到Vuex中
      （2）使用sessionStorage储存到本地
       
   Axios
    1、获取赛事
    2、新建赛事
   
   Vuex 
    state - matchId、matchName
    mutation - changeMatchId、changeMatchName
    
  SessionStorage
    matchId、matchName
```
