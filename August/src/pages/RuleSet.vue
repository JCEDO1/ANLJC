<template>
  <div>
    <div style="margin-left: 30px;">
      <h1>规则设置</h1>
    </div>
    <div class="block">
      <div class="block-title">
        比赛规则设置
      </div>
      <div class="block-content">
        <!--personal-->
        <div class="row">
          <span>个人可报项目上限：</span>
          <el-select v-model="personalItemMax">
            <el-option
              v-for="(item,index) in this.$store.state.itemsList"
              v-if="!item.isGroupItem"
              :value="index+1"
              :key="index">

            </el-option>
          </el-select>
        </div>
        <!--team-->
        <div class="row">
          <span>团队赛人员限制：</span>
          <el-select v-model="teamMin">
            <el-option
              v-for="(item,index) in teamNumList"
              :value="item"
              :key="index">

            </el-option>
          </el-select>
          <span>-</span>
          <el-select v-model="teamMax">
            <el-option
              v-for="(item,index) in teamNumList"
              :value="item"
              :key="index">

            </el-option>
          </el-select>
        </div>
        <div class="row">
          //还有没有写的，操他妈的
        </div>
      </div>
    </div>
    <div class="router-icon">
      <router-link :to="{path:'/Nav/GroupSet'}" tag="span" class="router-left"><i class="el-icon-arrow-left"></i>组别设置</router-link>
      <router-link :to="{path:'/Nav/RankSet'}" tag="span" class="router-right">名次设置<i class="el-icon-arrow-right"></i></router-link>
    </div>
  </div>
</template>

<script>
  export default{
    name:'',
    data(){
      return {
        personalItemMax:'',
        teamNumList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        teamMax:'',
        teamMin:''
      }
    },
    methods:{

    },
    computed:{

    },
    mounted(){

    }

  }
</script>

<style>

</style>
