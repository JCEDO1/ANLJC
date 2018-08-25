<template>
  <div>

    <div style="margin-left: 30px;">
      <h1>年龄设置</h1>
    </div>

    <div class="block">
      <div class="block-title">
        根据年龄段选择出生日期范围
      </div>
      <div class="block-content">

        <template v-for="item in ageData">
          <div style="width:100%">
            <span>
              {{item.name}}：
            </span>
            <el-date-picker
              v-model="item.data"
              type="daterange"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              @change="ageDataVad"
              :picker-options="pickerOptions">
              <!--:picker-options="limit"-->

            </el-date-picker>
          </div>

        </template>
        <el-button @click="checkAll">确 定</el-button>
        <el-button @click="reset">重 置</el-button>
      </div>
    </div>
    <div class="router-icon">
      <router-link class="router-right" tag="span" :to="{path:'/Nav/GroupSet'}">组别设置<i class="el-icon-arrow-right"></i></router-link>

    </div>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default{
    name:'AgeSet',
    data(){
      return {
        ageData:[
          {name:'青成年组',data:''},
          {name:'少年A组',data:''},
          {name:'少年B组',data:''},
          {name:'少年C组',data:''},
          {name:'儿童A组',data:''},
          {name:'儿童B组',data:''},
          {name:'儿童C组',data:''},
        ],
        ageForm:[
          {
            group:'adult',
            starttime:'',
            endtime:'',
            match_id:''
          },{
            group:'teenA',
            starttime:'',
            endtime:'',
            match_id:''
          },{
            group:'teenB',
            starttime:'',
            endtime:'',
            match_id:''
          },{
            group:'teenC',
            starttime:'',
            endtime:'',
            match_id:''
          },{
            group:'childA',
            starttime:'',
            endtime:'',
            match_id:''
          },{
            group:'childB',
            starttime:'',
            endtime:'',
            match_id:''
          },{
            group:'childC',
            starttime:'',
            endtime:'',
            match_id:''
          },
        ],
        pickerOptions:{

        }

      }
    },
    methods:{
      //required
      checkReq(val){
        if( val !== "" && val !== null && val !== undefined){
          if(val.data !== "" && val.data !== null){
            return true;
          }
        }else{
          return false;
        }
      },
      //Element提示框
      openMessage(text,type){
        this.$message({
          message:text,
          type:type,
          center:true
        })
      },
      //寻找接收数据的位置
      search(value){
        let count = 0;
        let that = this;
        for(let i = 0 ;i < this.ageData.length ; i++){
          if(that.ageData[i].data === value){
            break
          }
          count++;
        }
        return count;
      },
      //重置
      reset(){
        this.ageData.forEach(v=>{
          v.data = '';
        })
        this.openMessage('已重置','success');
      },
      //验证ageData中的正确性
      ageDataVad(value){
        let that = this;
        let index = this.search(value);
        let prevEndData = '';
        let currentStartData = '';
        let currentEndData = '';
        let nextStartData = '';
        currentStartData = value[0];
        currentEndData = value[1];
        //检查两个值是否相同
        if(currentEndData === currentStartData){
          that.openMessage('填写信息有误1','error');
          that.ageData[index].data = [];
          return false;
        }

        //检查下一个值是否为空
        if(that.checkReq(that.ageData[index+1]).data){
          //得到下一个值
          nextStartData = that.ageData[index+1].data[0];
          if(nextStartData > currentEndData){

          }else{
            that.openMessage('填写信息有误2');
            that.ageData[index].data = '';
            return false;
          }
        }else{

        }


        if(that.checkReq(that.ageData[index-1]).data){
          prevEndData = that.ageData[index-1].data[1];
          if(prevEndData < currentStartData){

          }else{
            that.openMessage('填写信息有误3','error');
            that.ageData[index].data = '';
            return false;
          }
        }else{

        }

        return true;

      },
      //检查提交
      checkAll(){
        let that = this;
        let validateCode = 0;
        this.ageData.forEach( v => {
          if(that.ageDataVad(v.data)){
            validateCode++
          }
        })
        if(validateCode === 7){
          that.ageForm.forEach((v,index)=>{
            v.starttime = that.ageData[index].data[0];
            v.endtime = that.ageData[index].data[1];
            v.match_id = this.$store.state.matchId;
          })
          that.$post('/v1/matchdata/setgroupage',this.ageForm)
            .then(data=>{
            console.log(data);
            if(data.msg == 0){
              that.openMessage('设置成功','success');
            }
            that.refreshAgeData();

          })
        };
      },
      //重新获取
      refreshAgeData(){
        let that = this;
        this.$post('/v1/matchdata/groupage',{match_id:that.$store.state.matchId})
          .then(data => {
          console.log(data);
        that.$store.commit('changeGlobalAgeData',data.msg);
        sessionStorage.setItem('localAgeData',JSON.stringify(data.msg));
        that.conversion();
      })
      },
      conversion(){
        let that = this;
        this.globalAgeData.forEach(v=>{
          that.ageForm.forEach(m=>{
            if(v.group === m.group){
              m.starttime = v.starttime;
              m.endtime = v.endtime;
            }
          })
        });
        this.ageData.forEach((v,index)=>{
          v.data = [that.ageForm[index].starttime,that.ageForm[index].endtime];
        });
      },
      next(){
        this.$router.push({path:'/Nav/GroupSet'});
      }
    },
    computed:{
      ...mapState({
        globalAgeData:'globalAgeData'
      })
    },
    mounted(){
      let that = this;

      setTimeout(function () {
        that.conversion();
      },800);

      this.$message({
        message:'您可以在此设置这次比赛的组别年龄限制',
        type:'info',
        duration:3000
      });



    }
  }
</script>

<style scoped>
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width:350px;
  }
  .insert-enter-active{
    transition: all linear .8s;
  }
  .insert-leave-active {
    transition: all linear .3s;
  }
  .insert-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .insert-leave-to{
    opacity: 0;
    transform: translateX(-50px);
  }
</style>
