<template>
  <div>
    <div class="block">
      <div class="block-content  loginDiv">
      <div>
        <el-input v-model="ud.username" placeholder="请输入用户名"></el-input>
      </div>
      <div>
        <!--@keyup.enter.native 未理解-->
        <el-input v-model="ud.password" placeholder="请输入密码" @keyup.enter.native="l"></el-input>
      </div>
      <el-button @click="l">LOGIN</el-button>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  var sessionStorage = window.sessionStorage;
  export default{
    name: '',
    data(){
      return {
        ud:{
          username:'',
          password:''
        }
      }
    },
    methods: {
      l(){
        if(this.ud.username && this.ud.password){
          axios.post('/v1/user/login',this.ud)
            .then((data) => {
            switch (data.data.msg){
              case 0:
                this.t();
                break;
              case 1:
                alert('密码错误');
                break;
              case 2:
                alert('账号不存在');
                break
            }
          })
        }else{
          alert('不可以为空');
        }
      },
      t(){
        Object.keys(this.ud).forEach(v=>{
          v = '';
        });
        sessionStorage.setItem('isLoginState',1);
        this.$store.commit('changeIsLogin',1);
        this.$router.push({path:'/GameManager'});
      }
    },
    computed: {},
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
    mount(){
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

    }
  }
</script>

<style>
  .loginDiv{
    /*position: absolute;*/
    /*top:30%;*/
    /*left: 50%;*/
    /*transform: translate(-50%,-50%);*/
  }
</style>
