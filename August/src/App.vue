<template>
  <div id="app">


  <transition name="fade" >
    <router-view></router-view>
  </transition>


  </div>
</template>

<script>




  import {mapState} from 'vuex'
  var sessionStorage = window.sessionStorage;
  export default {
    name: 'App',
    data(){
      return {
        //检验是否登陆
        LoginState:'',
        //watch计时用
        timer:false,
        clientWidth:document.documentElement.clientWidth,
      }
    },
    computed:{
      ...mapState({
        isLogin:'isLogin',
        color:'color'
      })

    },
    watch:{
      clientWidth(curVal,oldVal){
        if(!this.timer){
          let that = this;
          that.timer = true;
          setTimeout(function () {
            console.log('当前屏幕宽度为:'+that.clientWidth);
            that.$store.commit('changeScreenLevel',that.clientWidth);
            that.timer = false;
          },400)
        }
      }
    },
    mounted(){
      // 然后监听window的resize事件
      const that = this;
      window.onresize = () => {
        that.clientWidth = `${document.documentElement.clientWidth}`;
      };
      let sessionStorageMatchId = sessionStorage.getItem('matchId');
      let sessionStorageMatchName = sessionStorage.getItem('matchName');
      let sessionStorageGlobalAgeData = sessionStorage.getItem('localAgeData');
      let sessionStorageSignedData = sessionStorage.getItem('localSignedData');
      if(sessionStorageMatchId!=''&&sessionStorageMatchId!=null){
        this.$store.commit('changeMatchId',parseInt(sessionStorageMatchId));
      }
      if(sessionStorageMatchName!=''&&sessionStorageMatchName!=null){
        this.$store.commit('changematchName',sessionStorageMatchName);
      }
      if(sessionStorageGlobalAgeData!=''&&sessionStorageGlobalAgeData!=null){
        this.$store.commit('changeGlobalAgeData',JSON.parse(sessionStorageGlobalAgeData));
      }
      if(sessionStorageSignedData!='' && sessionStorageSignedData!=null && sessionStorageSignedData != 0 ){

        JSON.parse(sessionStorageSignedData).forEach(v=>{
          if(v.match_id == that.$store.state.matchId){
            that.$store.commit('changeItemGroupData',v);
          }
        })
      }

    },

  }
</script>

<style>

  #app {
    width:100%;
    height:100%;
    margin:0 auto;
    padding:0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  /*====================*标签样式*==================================*/
  /*hr{*/
    /*width: 95%;*/
    /*float: left;*/
    /*color:#999999;*/
  /*}*/
  /*====================*基本单位样式*==================================*/
  /*block*/
  .block{
    width:95%;
    height:100%;
    margin: 10px auto;
    text-align: center;
    border:1px #eeeeee solid;
    box-shadow:2px 2px 2px #888888;
  }
    .block-title{
      text-align: left;
      background-color: #f5f7fa;
      width: 99%;
      height:100%;
      padding: 5px;
      margin: 0px auto;

      /*border-bottom: 1px #000000 solid;*/
    }
    .block-content{
      height:100%;
      width: 95%;
      margin: 10px auto;
      padding: 5px;
    }

  .row{
    width: 100% !important;
    margin: 20px auto !important;
  }
  /*square*/
  .square{
    margin: 10px;
    display: inline-block;
    width:300px;
    padding:20px;
    text-align: center;
    border:1px #cccccc solid;
    border-radius: 4px;
    box-shadow: 1px 1px 2px #888888;
  }
    .square-animation{

    }
  .nav-bar{
    width: 100%;
    height:47px;
    border-bottom: 1px #cccccc solid;
  }
  .float-right{
    float: right;
    margin-right: 10px;
    margin-top: 5px;
  }
  .float-left{
    float: left;
    margin-left: 10px;
    margin-top: 5px;
  }


  .router-icon{
    margin: 10px;
    padding:20px
  }
    .router-icon .router-right{
      float: right;
      cursor:pointer;
    }

    .router-icon .router-left{
      float: left;
      cursor:pointer;
    }
  /*====================*宽度样式*==================================*/
  .h-w{
    width: 80%;
  }
  .m-w{
    width: 60%;
  }
  .l-w{
    width: 40%;
  }
  /*====================*title*==================================*/
  .title{
    margin: 10px;
  }
  /*====================*row、center*==================================*/
  .row{
    width:100%;
    margin: 10px;
    padding:5px;
  }
  .center{
    margin: 10px auto;

  }
  /*====================*过渡样式*==================================*/
  .fade-enter-active{
    transition: all linear .8s;
  }
  .fade-leave-active {
    transition: all linear .3s;
  }
  .fade-enter{
    opacity: 0;
    transform: translateY(50px);
  }
  .fade-leave-to{
    opacity: 0;
    transform: translateX(-50px);
  }
</style>
