<template>
  <div>
    <div class="nav-bar">
      <div class="float-left">
        <el-button type="text" @click="to('/NavMenu')">功能列表</el-button>
      </div>
      <div class="float-right">
        {{this.$store.state.color}}
        <el-color-picker :value="this.$store.state.color" @change="setColor"></el-color-picker>
      </div>
    </div>
    <br>
    <transition name="fade">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Store from '../store/index'
  var sessionStorage = window.sessionStorage;
  export default{
    name: 'Nav',
    data(){
      return {

      }
    },
    methods:{
      to(path){
        this.$router.push({path:path});
      },
      setColor(val){
        this.$store.commit('changeColor',val);
      }
    },
    computed:{
      ...mapState({

      })
    },
    watch: {},
    beforeCreat(){
        //el和data还没有初始化
    },
    create(){
        //完成了data的初始化，el没有
    },
    beforeMount(){
        //完成了el和data的初始化
        //el在这里使用Virtual DOM技术，将位置占据。但还没有渲染
    },
    mounted(){
        //完成挂载

    },
    beforeUpdata(){

    },
    update(){
        //改变app中的数据
    },
    beforDestroy(){

    },
    destroyed(){

    },
    beforeRouterEnter(to,from,next){


      next();
    }
  }
</script>

<style>

</style>
