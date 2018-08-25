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
          :limit="1"
          :on-exceed="limit"
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
        请确认数据
      </div>
      <!--
      ageGroup:"男子成青组"
      identify:"450421200003308515"
      index:"1"
      name:"潘启乐"
      sex:"男"
      speed:"1"
      speedskating:"1"
      -->
      <div class="block-content">
        <el-row>

            <el-col :span="4" :offset="2">
              <span>队伍名称</span>
              <el-input v-model="teamName"></el-input>
            </el-col>
            <el-col :span="4">
              <span>教练员名称：</span>
              <el-input v-model="coachName"></el-input>
            </el-col>
            <el-col :span="4">
              <span>教练员电话：</span>
              <el-input v-model="coachPhone"></el-input>
            </el-col>
            <el-col :span="4">
              <span>领队名称：</span>
              <el-input v-model="leaderName"></el-input>
            </el-col>
            <el-col :span="4">
              <span>领队电话：</span>
              <el-input v-model="leaderPhone"></el-input>
            </el-col>


        </el-row>
        <hr>
        <el-table :data="xlsxData"
                  style="width: 100%"

                  @cell-dblclick="edit"

                  :default-sortable="{prop:'name',order:'descending'}">
          <el-table-column label="#" width="50">
            <template slot-scope="scope">
              <el-button type="text" @click.prevent="deleteData(scope.$index)" @dblclick=""><i class="el-icon-close"></i></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center" width="80" sortable>
          </el-table-column>
          <el-table-column prop="sex" label="性别" align="center" width="80">
          </el-table-column>
          <el-table-column prop="identify" label="身份证" align="center" ></el-table-column>
          <el-table-column prop="ageGroup" label="组别" align="center" ></el-table-column>

          <el-table-column v-for="item in itemsList"
                           :prop="item.name"
                           :label="item.CNName"
                           :key="item.name"
                           align="center"
                           width="80"
                           ></el-table-column>

          <!--<el-table-column prop="speed" label="速度过桩"></el-table-column>-->
          <!--<el-table-column prop="speedskating" label="速度轮滑"></el-table-column>-->
          <!--<el-table-column prop="single" label="花式绕桩"></el-table-column>-->
          <!--<el-table-column prop="double" label="双人花桩"></el-table-column>-->
          <!--<el-table-column prop="skiddingdragon" label="轮滑拉龙"></el-table-column>-->
          <!--<el-table-column prop="double" label="双人花桩"></el-table-column>-->
          <!--<el-table-column prop="skiddingdance" label="轮滑舞蹈"></el-table-column>-->



        </el-table>
        <p></p>
        <el-button v-if="isGotData" @click="subData">提 交</el-button>

        <el-tooltip content="点击查看本次比赛开设项目与组别"  placement="top" effect="dark">
          <el-button type="text" @click="dialogVisible = true">
            <i class="el-icon-warning"></i>
          </el-button>
        </el-tooltip>

      </div>
    </div>


    <div class="router-icon">
      <router-link :to="{path:'/Nav/SingleSign'}" tag="span" class="router-right">填表报名<i class="el-icon-arrow-right"></i></router-link>
    </div>


    <el-dialog :visible.sync="dialogVisible">
      <itemform></itemform>
    </el-dialog>
  </div>
</template>

<script>
  import itemForm from '../components/itemForm.vue'
  import Vue from 'vue'
  import vueXlsxTable from 'vue-xlsx-table'
  import XLSX from 'xlsx'
  Vue.use(vueXlsxTable,{rABC:false})
  Vue.use(XLSX)
  import {mapState} from 'vuex'
  export default{
    name:'UpLoad',
    data(){
      return{
        //getData List
        lists:[

        ],
//注册返回的单位id
        unitId:'',
        //getData
        teamName:'',
        leaderName:'',
        leaderPhone:'',
        coachName:'',
        coachPhone:'',
        unitName:'',
        xlsxData:[],
        errorData:[],
        isGotData:false,
        isValidate:false,
        dialogVisible:false
      }
    },
    methods:{
//deleteData
      deleteData(index){
        this.xlsxData.splice(index,1);
      },
//可编辑
      edit(row,column,cell,event){
//    行数据    console.log(row);

//        console.log(cell);
//        console.log(event);

//        console.log(cell);
        let that = this;
        //拿index - 用于找数据修改位置
        let index = parseInt(row.index)-1;

        let value =  event.target.innerText;
//拿键值
        let key = column.property;

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
//读取execl
      //
      readExcel(file,fileList){
        var that = this;
        let suffix = file.name.split(".")[1];
//错误后没有调用到钩子，取消上传
        if(suffix === "xlsx" || suffix === "xls"){

          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            var data = e.target.result;
            var workbook = XLSX.read(data,{type:'binary'});
//          console.log(workbook);

//          console.log('表对象：'+ workbook.Sheets.Sheet1);
            that.getData(workbook.Sheets.Sheet1,file.name);

//转csv格式
//          that.readWorkBook(workbook);ß
          }
          fileReader.readAsBinaryString(file.raw);

        }else{

          for(let i = 0 ; i < fileList.length ; i++){
            if(file.name === fileList[i].name){
              fileList.splice(i,1);
              break;
            }
          }
          that.$message({
            message:'选择文件格式有误，请重新上传',
            center:true,
            type:'error',
            duration:3000
          })
        }
      },

      limit(file,fileList){

        this.$message({
          type:'error',
          message:'每次仅可以上传一个文件',
          duration:2000
        })
      },

//传入worksheet.Sheet.Sheet1对象，拿数据放入data
      //
      getData(s,name){

        let ref = s["!ref"];
        let rows = parseInt(ref.slice(ref.length-2,ref.length));
        let that = this;
        //项目的行数
        let rowCount;
        /*
        *  @params
        * */
        let word,num;
        for(var prop in s){

          word = prop.slice(0,1);
            if(/队$/.test(s[prop].w)){
              that.teamName = s[prop].w;
            }
            else if(/领队/.test(s[prop].w)){
            that.leaderName = s[prop].w.split("：")[1];
            that.leaderPhone = true;
            }
            else if(/手机/.test(s[prop].w) && (that.leaderPhone===true)){
              that.leaderPhone = s[prop].w.split("：")[1];
            }
            else if(/教练/.test(s[prop].w)){
              that.coachName = s[prop].w.split("：")[1];
              that.coachPhone = true;
            }
            else if(/手机/.test(s[prop].w) && (that.coachPhone===true)){
              that.coachPhone = s[prop].w.split("：")[1];
            }
            else if(s[prop].w === '序号'){
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
            else if(s[prop].w === '身份证ID'){
              that.lists.push({
                name:'identify',
                word:word
              });
            }
            else if(s[prop].w === '年龄组'){
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
              rowCount = parseInt(prop.slice(1,prop.length));

//              console.log('表头行数：'+rowCount);
            }
        }


        for(let i = 0 ; i < rows-rowCount ; i++) {
          that.xlsxData.push({
            name: '', identify: '', sex: '', ageGroup: '', speed: '', speedskating: '',
            obstacle: '', skiddingjump: '', single: '', skaking: '', double: '', skiddingdragon: '', skiddingdance: ''
          });
        }

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
            }
          }
        }
        this.isGotData = true;

      },
//注册单位
      unitRegister(){
        let that = this;
        let checkCN = /^[\u4e00-\u9fa5]|[A-Z]|[a-z]+$/;
        var checkPhone = /^[\d]{11}$/;
        if(checkCN.test(that.teamName) && checkCN.test(that.coachName) && checkCN.test(that.leaderName) && checkPhone.test(that.coachPhone) && checkPhone.test(that.leaderPhone)){
          that.$post('/v1/team/unit_register',{
            name:that.teamName,
            leader:that.leaderName,
            leaderphone:that.leaderPhone,
            coach:that.coachName,
            coachphone:that.coachPhone,
            match_id:that.$store.state.matchId
          })
            .then(data=>{
              this.unitId = data.msg;
            })
        }
      },
//运动员注册
      athleteRegister(){
        let that = this;
        let registerData = [];
        this.xlsxData.forEach(v=>{
          registerData.push({
            name:v.name,
            sex:v.sex,
            identify:v.identify
          })
        });

        this.$post('/v1/excel/athlete',registerData)
          .then(data=>{
            console.log(data);
            data.msg.forEach(v=>{
              that.xlsxData.forEach(m=>{
                if(v.name === m.name){
                  m.id = v.id;
                }
              })
            })
          })
      },
//验证组别
      groupCheck(that){
        var tbody = document.getElementsByTagName('tbody')[0];
        var trs = tbody.childNodes;

        this.isValidate = true;
        for(let k = 0 ; k < trs.length-1 ; k++){
          trs[k].style.backgroundColor = '#ffffff';
          trs[k].style.color = 'black';
        }

        for(let i = 0 ; i < that.xlsxData.length ; i++){


          var identify = that.xlsxData[i].identify.slice(6,10) +'-'+ that.xlsxData[i].identify.slice(10,12) +'-'+ that.xlsxData[i].identify.slice(12,14);

          var groupName = '';

          for(let j = 0 ; j < that.globalAgeData.length ; j++){
            if(identify < that.globalAgeData[j].endtime && identify > that.globalAgeData[j].starttime){
//根据identify确定组别
              groupName = that.globalAgeData[j].CNGroup;

            }
          }
          let index ;

//比较groupName，不相同，标红
          if( groupName!==that.xlsxData[i].ageGroup.slice(2,that.xlsxData[i].ageGroup.length)&& groupName !==(that.xlsxData[i].ageGroup)){
//            console.log(groupName);
//            console.log(that.xlsxData[i].name);

            trs[i].style.backgroundColor = '#ee3b3b';
            that.isValidate = false;
          }else{

            for(var prop in that.xlsxData[i]){
              let itemCode = false;

              if(that.xlsxData[i][prop] == 1 ){

                for(let j = 0 ; j < that.itemsList.length ; j++){
                  if(prop === that.itemsList[j].name){
                    index = j;
                    break;
                  }
                }

                for(let k = 0 ; k < that.itemsList[index].group.length ; k++){
                  if(identify < that.itemsList[index].group[k].endtime && identify > that.itemsList[index].group[k].starttime){
                    itemCode = true;

                  }
                }
                if(!itemCode){
                    trs[i].style.backgroundColor = 'yellow';
                    that.isValidate = false;
                }
              }
            }
          }
        }

      },
//运动员单人报名
      athleteSign(){
        let that = this;
        let athleteData = [];

        this.xlsxData.forEach(v=>{
          let matchclass = "";
          let matchgroup = "";
          for(var key in v){
            if(key !== 'skiddingdance' && key !== 'skiddingdragon' && key !== 'double' && key !== 'index' && v[key] === '1'){
              matchclass += '+' + key;
            }
          }
          for(let k = 0 ; k < that.groupList.length ; k++){
            let l = v.ageGroup.length;
            if(v.ageGroup.slice(2,l) === that.groupList[k].name || v.ageGroup === that.groupList[k].name){
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
        console.log(athleteData);
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
//团体报名
      teamSign(itemName){
        let that = this;
        let teamList = [];
        let athleteList = [];
        let reqData = [];
        //拿出所有的组别和人
        this.xlsxData.forEach(v=>{
          if(v[itemName] !== "" && (teamList.indexOf(v[itemName]) === -1) && v[itemName]!==undefined){
            teamList.push(v[itemName]);
            console.log(v[itemName]);
            let index = teamList.indexOf(v[itemName]);
            athleteList[index] = [];
            athleteList[index].push({id:v.id,group:v.ageGroup.slice(2,v.ageGroup.length)});
          }else if(v[itemName] !== "" && (teamList.indexOf(v[itemName]) !== -1)){
            let index = teamList.indexOf(v[itemName]);
            athleteList[index].push({id:v.id,group:v.ageGroup.slice(2,v.ageGroup.length)});
          }
        })
        console.log(teamList);
        console.log(athleteList);
        if(teamList = []){
          return false;
        }
        //判断是什么组别
        let groupAidedList = [];
        let groupList = [];
        for(let i = 0 ; i < athleteList.length ; i++){
          groupAidedList.push([]);
          for(let j = 0 ; j < athleteList[i].length ; j++){
            let key = athleteList[i][j].group;
            if(groupAidedList[i][key] == undefined){
              groupAidedList[i][key] = 1;
            }else{
              groupAidedList[i][key] = groupAidedList[i][key] + 1;
            }
          }
          let max = '';
          for(var prop in groupAidedList[i]){
            if(max == ''){
              max = prop;
            }else{
              max = (groupAidedList[i][prop] > groupAidedList[i][max]) ? prop : max;
            }
          }
          that.groupList.forEach(v=>{
            if(max == v.name){
              groupList.push(v.num);
            }
          })
        }
        for(let a = 0 ; a < teamList.length ; a++){
          let ad = '';
          for(let i = 0 ; i < athleteList[a].length ; i++){
            ad += '+' + athleteList[a][i].id;
          }
          console.log(ad);
          reqData.push({
            name:that.teamName,
            matchclass:itemName,
            group:groupList[a],
            match_id:that.$store.state.matchId,
            athlete_id:ad,
            unit_id:that.unitId
          })
        }
        this.$post('/v1/excel/team',reqData)
          .then(data=>{
            console.log(data);
          })

      },
//计数数组中元素出现次数

//清空数据
      //
      clearData(file,fileList){
        this.xlsxData = [];
        this.isGotData = false;
      },
//验证数据
      //
      validData(p){
        var checkCN = /^[\u4e00-\u9fa5]|[A-Z]|[a-z]+$/;
        var checkSex = /^男|女$/;
        var checkId = /^[\d]{17}[\d|X]$/;
        var checkItemChoice = /^$|[1]$/
        if(!checkCN.test(p.name)){
          console.log('name error');
          return '姓名填写有误';
        }else if(!checkSex.test(p.sex)){
          console.log('sex error');
          return '性别填写有误';
        }else if(!checkId.test(p.identify)){
          return '身份证填写有误';
        }else if(!checkCN.test(p.ageGroup)){
          return '组别填写有误';
        }else if(!checkItemChoice.test(p.speed)||!checkItemChoice.test(p.speed)||!checkItemChoice.test(p.speedskating)||!checkItemChoice.test(p.obstacle)||
          !checkItemChoice.test(p.skiddingjump)||!checkItemChoice.test(p.single)||!checkItemChoice.test(p.skaking)||!checkItemChoice.test(p.double)||
          !checkItemChoice.test(p.skiddingdragon)||!checkItemChoice.test(p.skiddingdance)){
          console.log('speed error');
          return '没有选择项目';
        }
        else{
          return true;
        }
      },
//提交
      subData(){

        let that = this;
        let errorCode = true;
//单位注册
        this.unitRegister();

        this.xlsxData.forEach(v=>{
          if(that.validData(v) !== true){
            errorCode = false;
            that.$message({
              type:'error',
              message:v.name+'---'+that.validData(v),
              duration:2000
            })
          }
        })
        if(errorCode){
//个人注册
          that.athleteRegister();

          that.groupCheck(that);

          setTimeout(function () {
            that.$notify.warning({
              title:'黄色标记',
              message:'个别项目在本次比赛没有开设',
              duration:2000
            })
          },1000);
          that.$notify.error({
            title:'红色标记',
            message:'报名人员组别填写错误',
            duration:2000
          })
        }
        if(this.isValidate){
          setTimeout(function () {
            that.athleteSign();
            that.teamSign('skiddingdance');
            that.teamSign('skiddingdrangon');
            that.teamSign('double');
          },1000)
        }
//        else{
//          that.$message({
//            message:'参赛者信息有误',
//            type:'error',
//            duration:2000,
//            center:true
//          })
//        }



      },

    },
    computed:{
      ...mapState({
        itemsList:'itemsList',
        globalAgeData:'globalAgeData',
        groupList:'groupList'
      }),

    },
    mounted(){

    },
    components:{
      itemform:itemForm
    }
  }
</script>

<style scoped>
  .cell{
    text-align: center;
  }
  .el-icon-close{
    color:red;
    cursor:pointer;
  }
</style>
