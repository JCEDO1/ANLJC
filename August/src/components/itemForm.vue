<template>
  <div>
    <table class="gridtable">
      <tr v-for="row in formData">
          <td v-for="item in row">
            <span>{{item}}</span>
          </td>
      </tr>
    </table>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default{
    name:'itemForm',
    data(){
      return {
        formData:[]
      }
    },
    methods:{
      init(){
        let that = this;
        let a = '\\';
        let group = [];
//初始化项目
        group.push(a);
        for(let i = 0 ; i < that.itemsList.length ; i++){
          if(that.itemsList[i].isEstablish){
            group.push(that.itemsList[i].CNName);
          }

        }
        this.formData.push(group);
//组别
        this.groupList.forEach(v=>{
          let item = [];
          let count = false;
          item.push(v.name);
          console.log(v.num);
          //item
          for(let x = 0 ; x < that.itemsList.length ; x++){
            //group
            let ed = false;
            for (let y = 0; y < that.itemsList[x].group.length; y++) {

              if (v.num == that.itemsList[x].group[y].matchdetail_id) {
                item.push(1);
                count = true;
                ed = true;
                break;
              }
            }
            if(!ed && that.itemsList[x].isEstablish){
              item.push("");

            }
          }
          if(count){
            console.log(item);
            that.formData.push(item);
          }



        })
      }
    },
    mounted(){
      this.init();
    },
    computed:{
      ...mapState({
        itemsList:'itemsList',
        groupList:'groupList'
      })
    }
  }
</script>

<style scoped>
  table.gridtable {
    margin: 0 auto;
    font-family: verdana,arial,sans-serif;
    font-size:16px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }
  table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
  }
  table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
  }
</style>

