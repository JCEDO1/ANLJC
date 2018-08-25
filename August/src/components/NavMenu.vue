<template>
  <div>
    <div class="row">
      <div style="width:auto; text-align: center;">
        <template v-for="item in navList">
          <!--过渡动画样式没做-->
          <div class="square" @click="to(item.path)">
            <div style="height: 200px;width:100%; background:linear-gradient(45deg,#81838d,#bd8f8c,#b1c2bc);"></div>
            {{item.name}}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  var sessionStorage = window.sessionStorage;
  export default{
    name: 'NavMenu',
    data(){
      return {
        navList:[
          {
            name:'赛事设置',
            path:'/Nav/AgeSet',
            imgPath:''
          },
          {
            name:'报名通道',
            path:'/Nav/UpLoad',
            imgPath:''
          },
          {
            name:'生成出场顺序',
            path:'/Nav/Order',
            imgPath:''
          },
          {
            name:'赛事控制',
            path:'',
            imgPath:''
          },
          {
            name:'人员管理',
            path:'/Nav/Sign',
            imgPath:''
          }
        ]
      }
    },
    methods: {
      to(path){
        this.$router.push({path:path});
      }
    },
    computed:{
      ...mapState({
        matchId:'matchId'
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
//综合一个状态码来判断是否完成了请求
      //完成挂载
      let that = this;
      this.$post('/v1/matchdata/groupage',{match_id:that.$store.state.matchId})
        .then(data=>{
          that.$store.commit('changeGlobalAgeData',data.msg);
          sessionStorage.setItem('localAgeData',JSON.stringify(data.msg));
        });


      this.$post('/v1/matchdata/group',{match_id:that.$store.state.matchId})
        .then(data=>{
          console.log(data);
          sessionStorage.setItem('localSignedData',JSON.stringify(data.msg));
          that.$store.commit('cleanItemGroupData');
          data.msg.forEach(v=>{
            if(v.match_id === that.matchId){
              that.$store.commit('changeItemGroupData',v);
            }else{
              that.$message({
                message:'数据错误',
                type:'error'
              })
            }
          })
        })
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

</style>
