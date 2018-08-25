<template>
  <div>
    <div class="block">
      <div class="block-title">
        请选择你需要查看的组别
      </div>
      <div class="block-content">
        <el-select v-model="form.matchclass">
          <el-option v-for="(item,index) in itemsList"
                     v-if="item.isEstablish"
                     :label="item.CNName"
                     :value="item.name"
                     :key="index">

          </el-option>
        </el-select>
        <el-select v-model="form.matchgroup">
          <el-option v-for="(a,index) in groupList"
                     :value="a.num"
                     :label="a.name"
                     :key="index">

          </el-option>
        </el-select>
        <el-button>查看</el-button>
      </div>
    </div>
    <div class="block">
      <div class="block-title">
        查看和调整
      </div>
      <div class="block-content">
        <el-table>
          <el-table-column label="出场顺序"></el-table-column>
          <el-table-column label="姓名"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button>a</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    name:'Order',
    data(){
      return {
        form:{
          matchclass:'',
          matchgroup:'',
          match_id:this.$store.state.matchId
        }
      }
    },
    computed:{
      ...mapState({
        itemsList:'itemsList',
        groupList:'groupList'
      })
    }

  }
</script>

<style>

</style>
