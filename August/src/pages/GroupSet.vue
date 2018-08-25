<template>
  <!--bug 有几个没有禁用-->
  <div>

  <div class="block">


    <div class="block-content">
      <el-checkbox-group v-model="itemEstablish" @change="changeEstablish">
        <template v-for="(item,index) in itemsList">
          <el-checkbox-button
            :label="index"
            :checked="item.isEstablish">
            {{item.CNName}}
          </el-checkbox-button>
        </template>
      </el-checkbox-group>

    <el-collapse>
      <template v-for="item in itemsList" v-if="item.isEstablish">
        <el-collapse-item :title="item.CNName">
          <el-checkbox-button v-model="checkboxList[item.id-1].sex[0]">男</el-checkbox-button>
          <el-checkbox-button v-model="checkboxList[item.id-1].sex[1]">女</el-checkbox-button>
          <template v-for="gb in checkboxList[item.id-1].status">

            <el-checkbox-button
              v-model="gb.isCheck"
              label=true
              @change="changeState(item.id)"
              :disabled="gb.isDisabled">
              {{gb.name}}
            </el-checkbox-button>
          </template>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
    <div>
    <el-button @click="sub">
      提交
    </el-button>
  </div>
  </div>

    <div class="router-icon">
      <router-link :to="{path:'/Nav/AgeSet'}" class="router-left" tag="span"><i class="el-icon-arrow-left"></i>年龄设置</router-link>
      <router-link :to="{path:'/Nav/RuleSet'}" class="router-right" tag="span">来设置一下规则吧<i class="el-icon-arrow-right"></i></router-link>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  var sessionStorage = window.sessionStorage;
  export default{
    name:'GroupSet',
    data(){
      return {
        itemEstablish:[],
        checkboxList:[
          {
            id: 1, name: "speed",CNName:'速度过桩',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 2, name: "speedskating",CNName:'速度轮滑',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 3, name: "obstacle",CNName:'障碍轮滑',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 4, name: "skiddingjump",CNName:'轮滑跳高',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 5, name: "single",CNName:'单人花式',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 6, name: "skaking",CNName:'轮滑刹车',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 7, name: "double",CNName:'双人花式',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 8, name: "skiddingdragon",CNName:'轮滑拉龙',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          },
          {
            id: 9, name: "skiddingdance",CNName:'轮滑舞蹈',
            sex:[true,true],
            status:[
              {name:'青成年组',num:'1000000',isDisabled:false,isCheck:false},
              {name:'少年A组',num:'0100000',isDisabled:false,isCheck:false},
              {name:'少年B组',num:'0010000',isDisabled:false,isCheck:false},
              {name:'少年C组',num:'0001000',isDisabled:false,isCheck:false},
              {name:'儿童A组',num:'0000100',isDisabled:false,isCheck:false},
              {name:'儿童B组',num:'0000010',isDisabled:false,isCheck:false},
              {name:'儿童C组',num:'0000001',isDisabled:false,isCheck:false},
              {name:'青成年+少年A',num:'1100000',isDisabled:false,isCheck:false},
              {name:'少年A+少年B',num:'0110000',isDisabled:false,isCheck:false},
              {name:'少年B+少年C',num:'0011000',isDisabled:false,isCheck:false},
              {name:'少年C+儿童A',num:'0001100',isDisabled:false,isCheck:false},
              {name:'儿童A+儿童B',num:'0000110',isDisabled:false,isCheck:false},
              {name:'儿童B+儿童C',num:'0000011',isDisabled:false,isCheck:false},
              {name:'少年全拼',num:'0111000',isDisabled:false,isCheck:false},
              {name:'儿童全拼',num:'0000111',isDisabled:false,isCheck:false}
            ]
          }
        ]
      }
    },
    methods:{
      //开设比赛
      changeEstablish(){
        this.$store.commit('changeEstablish',this.itemEstablish);
      },
      //禁用
      /*
      *  @params itemId 项目ID
      *  @params groupNum 组别编号
      * */
      changeState(itemId){

        let that = this;
        let x = 0;
        let y = [];
        //找比赛项目
        for(let i = 0 ; i < this.checkboxList.length ; i++){
          if(that.checkboxList[i].id === itemId){
            x = i;
            break;
          }
        }

        let list = this.checkboxList[x].status;

        for(let j = 0 ; j < list.length ; j++){
          list[j].isDisabled = false;
          if(list[j].isCheck){
            y.push(j);
          }
        }

        y.forEach(m=>{
          let tarIndex = [];
          list[m].num.split("").forEach((v,index)=>{
            if(v == '1'){
              tarIndex.push(index);
            }
          });


          for(let n = 0 ; n < list.length ; n++){
            let disabledIndex = '';
            let comIndex = list[n].num.split('');
            for(let m = 0 ; m < tarIndex.length ; m++){
              if(comIndex[tarIndex[m]] == 1){
                disabledIndex = n;
                break;
              }
            }

            if(disabledIndex !== undefined && disabledIndex !== '' && disabledIndex !== null){
              if(list[m].isCheck == false){
                list[disabledIndex].isDisabled = false;
              }else if(list[m].isCheck == true){
                list[disabledIndex].isDisabled = true;
              }
            }

          }
          list[m].isDisabled = false;
        })


      },
      //2、加载时赋值
      init(that){

        that.$post('/v1/matchdata/group',{match_id:that.$store.state.matchId})
          .then(data=>{
            console.log(data);
            sessionStorage.setItem('localSignedData',JSON.stringify(data.msg));
            that.$store.commit('cleanItemGroupData');
            data.msg.forEach(v=>{
              if(v.match_id === that.$store.state.matchId){
                that.$store.commit('changeItemGroupData',v);
              }else{
                that.$message({
                  message:'数据错误',
                  type:'error'
                })
              }
            })
          })

        this.itemsList.forEach(m=>{
          if(m.isEstablish){
            that.itemEstablish.push(m.id-1);
            m.group.forEach(n=>{

              //拿项目在checkboxList中的index
              let index = -1;
              for( let i = 0 ; i < that.checkboxList.length ; i++){
                if(n.group == that.checkboxList[i].name){
                  index = i;
                  break;
                }
              }
//            console.log('index:'+index);
              //比较年龄
              let groupName = '';
              for( let j = 0 ; j < that.globalAgeData.length ; j++){
                if(n.starttime >= that.globalAgeData[j].starttime && n.endtime <= that.globalAgeData[j].endtime){
                  groupName = that.globalAgeData[j].group;
                  break;
                }
              }
              //拿组别index
              let groupIndex = -1;
              for(let p = 0 ; p < that.checkboxList[0].status.length ; p++){
                if(n.matchdetail_id == that.checkboxList[0].status[p].num){
                  groupIndex = p;
                  break;
                }
              }

//            console.log(groupName);
//            console.log(groupIndex);
              that.checkboxList[index].status[groupIndex].isCheck = true;
              that.changeState(index+1);


            })
          }




        })
      },
      sub(){
        let that = this;
        let matchId = this.$store.state.matchId;
        let reqData = [];
        this.itemEstablish.forEach(v=>{
          let group = that.checkboxList[v].name;

          let sex = '';
          if(!that.checkboxList[v].sex[0]&&!that.checkboxList[v].sex[1]){
            console.log('没有选择性别');
            return;
          }else if(that.checkboxList[v].sex[0]&&that.checkboxList[v].sex[1]){
            sex = '11'
          }else if(!that.checkboxList[v].sex[0]&&that.checkboxList[v].sex[1]){
            sex = '01'
          }else if(that.checkboxList[v].sex[0]&&!that.checkboxList[v].sex[1]){
            sex = '10'
          }

          let groupName = '';
          let groupNameArr = [];
          that.checkboxList[v].status.forEach(m=>{
            if(m.isCheck){
              groupNameArr.push(m.num);
            }else if(!m.isCheck){
              return;
            }
          })
          groupName = groupNameArr.join("+");


          reqData.push({
            match_id:matchId,
            sex:sex,
            groupname:groupName,
            group:group
          });
        })
        console.log(reqData);
        this.$post('/v1/matchdata/setgroup',reqData)
          .then(data=>{
            console.log(data);
            if(data.msg === 0){
              that.$message({
                message:'设置组别成功',
                type:'info'
              })
              that.init();
            }

          })
      }
    },
    mounted(){
      let that = this;
      this.$getLocalData();
      setTimeout(function () {
        that.init(that);
      },300)
      console.log('b');
      this.$message({
        message:'接下来，可以选择你所需要开设的项目组别',
        type:'info',
        duration:3000,
        center:true
      });
    },
    computed:{
      ...mapState({
        itemsList:'itemsList',
        globalAgeData:'globalAgeData',
        groupList:'groupList'
      })
    }
  }
</script>

<style>

</style>
