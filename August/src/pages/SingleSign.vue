<template>
  <div>
    <div class="block">
      <div class="block-title">
        个人报名渠道
      </div>
      <div class="block-content">
        <div class="m-w center">
          <el-input placeholder="请输入姓名"></el-input>
          <br>
          <br>
          <el-input placeholder="请输入身份证号码"></el-input>
        </div>
        <div class="center">
          <el-select v-model="itemChoice">
            <el-option
              v-for="item in itemsList"
              v-if="item.isEstablish && !item.isGroupItem"
              :key="item.name"
              :label="item.CNName"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="center">
          <span></span>
          <el-checkbox-button v-model="isUpGroup">
          确认升组
        </el-checkbox-button>
        </div>

        <div class="center">
          <el-button>
            确认报名
          </el-button>
        </div>
      </div>
    </div>
    <div class="router-icon">
      <router-link :to="{path:'/Nav/UpLoad'}" tag="span" class="router-left"><i class="el-icon-arrow-left"></i>Execl上传</router-link>
      <router-link :to="{path:'/Nav/UpLoadAll'}" tag="span" class="router-right">总表上传<i class="el-icon-arrow-right"></i></router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    name:'SingleSign',
    data(){
      return {
        itemChoice:'',
        groupChoice:'',
        isUpGroup:false
      }
    },
    methods:{

    },
    mounted(){
      this.$message({
        dangerouslyUseHTMLString: true,
        message:'<p>请填写以下表单进行报名，报名前请确保您已经完成了<a href="AltheteSign">运动员注册</a><p/>',
        center:'true',
        type:'info',
        duration:5000
      });
    },
    computed:{
      ...mapState({
        itemsList:'itemsList'
      })
    }
  }
</script>

<style>

</style>
