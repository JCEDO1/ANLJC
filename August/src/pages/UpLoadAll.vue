<!--
  1.分页，页码过多，不容易修改

-->
<template>
  <div>
    <div class="block">
      <div class="block-title">
        上传报名表
      </div>
      <div class="block-content">
        <el-upload
          ref="upload"
          action="/wm/upload"
          :on-change="readExcel"
          :auto-upload="false"
          :on-remove="clearData"
        >

          <el-button
            icon="el-icon-upload"
            type="primary"
          >
            上传文件
          </el-button>
        </el-upload>
      </div>
    </div>
    <div class="block">
      <div class="block-title">
        数据
      </div>
      <div class="block-content">
        <el-select v-model="currentTeam" filterable>
          <el-option
            v-for="team of teamList"
            :value="team"
            :key="team"

            >

          </el-option>
        </el-select>

        <el-table :data="showData"
                  stripe
                  style="width: 100%"
                  @cell-dblclick="edit"
                  :default-sortable="{prop:'teamName',order:'descending'}">
          <el-table-column prop="teamName" label="代表队" align="center" ></el-table-column>
          <el-table-column prop="name" label="姓名" align="center" width="80">
          </el-table-column>
          <el-table-column prop="sex" label="性别" align="center" width="80">
          </el-table-column>
          <el-table-column prop="ageGroup" label="组别" align="center" ></el-table-column>

          <el-table-column v-for="item in itemsList"
                           :prop="item.name"
                           :label="item.CNName"
                           :key="item.name"
                           align="center"
                           width="80"
          ></el-table-column>
        </el-table>

        <el-button v-if="isGotData" @click="subData">提 交</el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import vueXlsxTable from 'vue-xlsx-table'
  import XLSX from 'xlsx'
  Vue.use(vueXlsxTable,{rABC:false})
  Vue.use(XLSX)
  import {mapState} from 'vuex'
  export default{
    name:'UpLoadAll',
    data(){
      return{
        //辅助
        lists:[],
        teamList:[],
        currentTeam:'',
        //data

        xlsxData:[],
        isGotData:false,


      }
    },
    methods:{
      //验证数据
      validData(p){
        var checkCN = /^[\u4e00-\u9fa5]|[A-Z]|[a-z]+$/;
        var checkSex = /^男|女$/;
        var checkId = /^[\d]{17}[\d|X]{1}$/;
        var checkItemChoice = /^$|[1]$/
        if(!checkCN.test(p.name)){
          console.log('name error');
          return false;
        }else if(!checkSex.test(p.sex)){
          console.log('sex error');
          return false;
        }else if(!checkId.test(p.identify)){
          return false;
        }else if(!checkCN.test(p.ageGroup)){
          return false;
        }else if(!checkItemChoice.test(p.speed)||!checkItemChoice.test(p.speed)||!checkItemChoice.test(p.speedskating)||!checkItemChoice.test(p.obstacle)||
          !checkItemChoice.test(p.skiddingjump)||!checkItemChoice.test(p.single)||!checkItemChoice.test(p.skaking)||!checkItemChoice.test(p.double)||
          !checkItemChoice.test(p.skiddingdragon)||!checkItemChoice.test(p.skiddingdance)){
          console.log('speed error');
          return false;
        }
        else{
          return true;
        }
      },
      //读
      readExcel(file){
        var that = this;
        let suffix = file.name.split('.')[1];
        if(suffix === 'xlsx' || suffix === 'xls'){
          const fileReader = new FileReader();
          fileReader.onload = (e) =>{
            var data = e.target.result;
            var workbook = XLSX.read(data,{type:'binary'});
            that.getData(workbook.Sheets.Sheet1,file.name);
          }
          fileReader.readAsBinaryString(file.raw);
        }
      },
      //拿
      getData(s,name){

        let ref = s["!ref"];
        let rows = parseInt(ref.slice(4,ref.length));
        let that = this;
        //项目的行数
        let rowCount;
        /*
         *  @params
         * */
        let word,num;
        for(var prop in s){
          word = prop.slice(0,1);
//创建list，用于prop的分类
          if(s[prop].w === '编号'){
            that.lists.push({
              name:'index',
              word:word
            });
          }
          else if(s[prop].w === '姓名'){
            that.lists.push({
              name:'name',
              word:word
            });
          }
          else if(s[prop].w === '性别'){
            that.lists.push({
              name:'sex',
              word:word
            });
          }
          else if(s[prop].w === '组别'){
            that.lists.push({
              name:'ageGroup',
              word:word
            });
          }
          else if(s[prop].w === '速度轮滑'){
            that.lists.push({
              name:'speedskating',
              word:word
            });
          }
          else if(s[prop].w === '花式绕桩'){
            that.lists.push({
              name:'single',
              word:word
            });
          }
          else if(s[prop].w === '双人花桩'){
            that.lists.push({
              name:'double',
              word:word
            });
          }
          else if(s[prop].w === '速度过桩'){
            that.lists.push({
              name:'speed',
              word:word
            });
          }
          else if(s[prop].w === '轮滑拉龙'){
            that.lists.push({
              name:'skiddingdragon',
              word:word
            });
          }
          else if(s[prop].w === '轮滑舞蹈'){
            that.lists.push({
              name:'skiddingdance',
              word:word
            });
//              console.log('表头行数：'+rowCount);
          }
          else if(s[prop].w === '代表队'){
            that.lists.push({
              name:'teamName',
              word:word
            })
            rowCount = parseInt(prop.slice(1,prop.length));
            console.log(rowCount);
          }
        }

//创建空的格式
        console.log(rowCount);
        for(let i = 0 ; i < rows-rowCount ; i++) {
          that.xlsxData.push({
            name: '', sex: '', ageGroup: '', speed: '', speedskating: '',
            obstacle: '', skiddingjump: '', single: '', skaking: '', double: '', skiddingdragon: '', skiddingdance: '',teamName:''
          });
        }

//根据格式把数据放入
        for(var prop in s){
          word = prop.slice(0,1);
          num = parseInt(prop.slice(1,prop.length));
          let key;
          if(num > rowCount){
            that.lists.forEach(v=>{
              if(word === v.word){
                key = v.name;

              }
            })

            if(key !== undefined){
              that.xlsxData[num-rowCount-1][key] = s[prop].w;
              if(key == 'teamName'){
                if(that.teamList.indexOf(s[prop].w) === -1){
                  that.teamList.push(s[prop].w);
                }
              }
            }
          }
        }
        this.isGotData = true;

      },
      //clear
      clearData(file,fileList){
        this.xlsxData = [];
        this.isGotData = false;
      },
      //找
      searchKey(index,value){
        let obj = this.xlsxData[index];
        for(var key in obj){
          if(obj[key] === value){
            return key;
          }
        }
      },
      //编辑
      edit(row,column,cell,event){
//    行数据    console.log(row);
//     console.log(column);
//    元素      console.log(cell);
//        console.log(event);

        console.log(cell);
        let that = this;
        //拿index - 用于找数据修改位置
        let index = parseInt(row.index)-1;

        let value =  event.target.innerText;

        let key = this.searchKey(index,value);

        if(cell.children.length == 1){
          //置空
          event.target.innerHTML = "";

          //新建input - 给Class 和 type
          let cellInput = document.createElement("input");

          cellInput.setAttribute('class','cell-input');
          cellInput.setAttribute("type", "text");
          //给value
          cellInput.value = value;

          cellInput.style.width = '80%';
          //插入
          cell.appendChild(cellInput);
          cellInput.focus();

          cellInput.onblur = function() {
            //edit data
            let v = cellInput.value;
            that.xlsxData[index][key]= cellInput.value;

            cell.innerHTML = "";
            let cellDiv = document.createElement('div');
            cellDiv.setAttribute('class','cell');
            cellDiv.innerHTML = cellInput.value;
            cell.appendChild(cellDiv);
          };
        }


      },
      //selectTeam




      //运动员单人报名
      athleteSign(){
        let that = this;
        let athleteData = [];

        this.showData.forEach(v=>{
          let matchclass = "";
          let matchgroup = "";
          for(var key in v){
            if(key !== 'skiddingdance' && key !== 'skiddingdragon' && key !== 'double' && key !== 'index' && v[key] === '1'){
              matchclass += '+' + key;
            }
          }
          for(let k = 0 ; k < that.groupList.length ; k++){
            let l = v.ageGroup.length;
            if(v.ageGroup.slice(2,l) === that.groupList[k].name){
              matchgroup = that.groupList[k].num;
              break;
            }
          }
          athleteData.push({
            athlete_id:v.id,
            matchclass:matchclass,
            matchgroup:matchgroup,
            match_id:that.$store.state.matchId,
            unit_id:that.unitId
          })
        })

        this.$post('http://192.168.191.1:8080/v1/excel/constant',athleteData)
          .then(data=>{
            if(data.msg === 0){
              that.$message({
                message:'报名成功',
                type:'info',
                duration:2000
              })
            }
          })
      },



      subData(){
        let that = this;
        let errorCode = true;

        this.showData.forEach(v=>{
          if(that.validData(v)){
            errorCode = false;
          }
        })
        if(!errorCode){
          that.$message({
            message:'表单信息有错，请核对后在提交',
            type:'error',
            center:'true'
          })
        }else if(errorCode){
          that.athleteSign();
        }
      }
    },
    computed:{
      ...mapState({
        itemsList:'itemsList',
        globalAgeData:'globalAgeData',
        groupList:'groupList'
      }),
      showData(){
        let that = this;
        let arr = [];
        if(this.currentTeam != '' && this.currentTeam != null){
          that.xlsxData.forEach(v=>{
            if( v.teamName === that.currentTeam ){
              arr.push(v);
            }
          })
        }

        return arr;
      }
    }
  }
</script>

<style>

</style>
