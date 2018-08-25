<template>
  <div>
    <!--标题-->
    <div class="title" style="width:100%;">
      <h1>
        赛事列表
        <el-button class="float-right" @click="exit">退出</el-button>
      </h1>
    </div>
    <hr>
    <!--新建赛事与搜索-->
    <div class="row">
      <el-button type="primary" @click="dialogFormVisible = true">新建赛事</el-button>
    </div>
    <!--新建赛事dialog-->
    <el-dialog title="新建赛事"
               :visible.sync="dialogFormVisible"
               :width="dialogWidth"
               :top="dialogTop">
      <!--dialog中表单-->
      <el-form :model="formData"
               ref="dataForm"
               :rules="rules"
               :label-position="dialogLabelPosition">
        <el-form-item label="比赛名称:" :label-width="formLabelWidth" prop="name">
          <el-input v-model="formData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间" :label-width="formLabelWidth" prop="date">
            <el-date-picker
              v-model="formData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
              <!--@change="dateLimit"-->
            </el-date-picker>
        </el-form-item>
        <el-form-item label="比赛地点:" :label-width="formLabelWidth" prop="address">
          <el-input v-model="formData.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主办单位:" :label-width="formLabelWidth" prop="sponsor">
          <el-input v-model="formData.sponsor" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="承办单位:" :label-width="formLabelWidth" prop="coorganizer">
          <el-input v-model="formData.coorganizer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="协办单位:" :label-width="formLabelWidth" prop="organizer">
          <el-input v-model="formData.organizer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支持单位:" :label-width="formLabelWidth" prop="support">
          <el-input v-model="formData.support" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人:" :label-width="formLabelWidth" prop="contactname">
          <el-input v-model="formData.contactname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话:" :label-width="formLabelWidth" prop="contactphone">
          <el-input v-model="formData.contactphone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sub('dataForm')">确 认</el-button>
        <el-button @click="reset('dataForm')">重置</el-button>
        <el-button @click="close('dataForm')">取 消</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <div class="block-title" >
        <span>比赛列表</span>
      </div>
      <div class="block-content">
        <el-table :data="matchData" :stripe="isStripe">
          <el-table-column type="expand">
            <template slot-scope="props">

              <el-form label-position="left" inline class="demo-table-expand">
                <!--
                *****
                *           @params
                * sponsor     ---  主办单位
                * organizer   ---  协办单位
                * coorganizer ---  承办单位
                * support     ---  支持单位
                *
                -->
                <el-form-item label="比赛名称"><span>{{props.row.name}}</span></el-form-item>
                <el-form-item label="比赛时间"><span>{{props.row.starttime}} -- {{props.row.endtime}}</span></el-form-item>
                <el-form-item label="比赛地点"><span>{{props.row.address}}</span></el-form-item>
                <el-form-item label="主办单位"><span>{{props.row.sponsor}}</span></el-form-item>
                <el-form-item label="承办单位"><span>{{props.row.coorganizer}}</span></el-form-item>
                <el-form-item label="协办单位"><span>{{props.row.organizer}}</span></el-form-item>
                <el-form-item label="支持单位"><span>{{props.row.support}}</span></el-form-item>
                <el-form-item label="联系人"><span>{{props.row.contactname}}</span></el-form-item>
                <el-form-item label="联系电话"><span>{{props.row.contactPhone}}</span></el-form-item>

              </el-form>
            </template>


          </el-table-column>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="比赛名称" prop="name"></el-table-column>
          <el-table-column label="比赛开始时间" prop="starttime"></el-table-column>
          <el-table-column label="比赛地点" prop="address"></el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="to(scope.row.name,scope.row.id)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</div>
</template>

<script>
  import {mapState} from 'vuex'
  import ElementUI from 'element-ui'
  export default{
    name: 'gameManager',
    data(){
      return {
        isStripe:true,
        //dialog样式
        dialogFormVisible:false,
        formLabelWidth: '15%',
        dialogWidth:'90%',
        dialogTop:'3vh',
        dialogLabelPosition:'left',
        //dataForm验证规则
        rules: {
          name: [
            {required: true, message: '请输入比赛名称', trigger: 'blur'},
//            {validator: checkPureNum, trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择日期段', trigger: 'blur'},

          ],
          address: [
            {required: true, message: '请输入比赛地址', trigger: 'blur'},
//            {validator: checkPureNum, trigger: 'blur'}
          ],
          sponsor: [
            {required: true, message: '请输入主办单位名称', trigger: 'blur'},
//            {validator: checkPureNum, trigger: 'blur'}

          ],
          organizer: [
            {required: true, message: '请输入承办单位名称', trigger: 'blur'},
//            {validator: checkPureNum, trigger: 'blur'}

          ],
          coorganizer: [
            {required: true, message: '请输入协办单位名称', trigger: 'blur'},
//            {validator: checkPureNum, trigger: 'blur'}

          ],
          support: [
            {required: true, message: '请输入支持单位名称', trigger: 'blur'},
//            {validator: checkPureNum, trigger: 'blur'}

          ],
          contactname: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'},
//            {validator: checkContactName, trigger: 'blur'}
          ],
          contactphone: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'},
//            {validator: checkPhoneNumber, trigger: 'blur'}
          ]
        },
        formData:{
          name: '',
          date:'',
          address: '',
          sponsor:'',
          organizer:'',
          coorganizer:'',
          support:'',
          contactname:'',
          contactphone:''
        },
        matchData:[]
      }
    },
    methods: {
      sub(f){
        let that = this;
        this.$refs.dataForm.validate (valid =>{
          if(valid){
            this.$post('/v1/matchdata/create',{
              name:this.formData.name,
              starttime:this.formData.date[0],
              endtime:this.formData.date[1],
              address: this.formData.address,
              sponsor:this.formData.sponsor,
              organizer:this.formData.organizer,
              coorganizer:this.formData.coorganizer,
              support:this.formData.support,
              contactname:this.formData.contactname,
              contactphone:this.formData.contactphone})
              .then(data=>{
                if(data.msg == 0){
                  alert('比赛创建成功');
                  that.close('dataForm');
//重新载入一次比赛信息
                  that.getMatchData(that);
                }
              })
          }else{
            alert('请核对表单每一项填写是否正确');
            return false;
          }
        })

      },
      reset(f){
        this.$refs[f].resetFields();
      },
      close(f){
        this.$refs[f].resetFields();
        this.dialogFormVisible = false;
      },
//拿id和name，存在本地和store，取NavMenu页面
      to(name,id){
        console.log(name,id);
        sessionStorage.setItem('matchId',id);
        sessionStorage.setItem('matchName',name);
        this.$store.commit('changeMatchId',id);
        this.$store.commit('changematchName',name);
        this.$router.push({path:'/NavMenu'});
      },
//拿数据
      getMatchData(that){
        that.matchData = [];
        that.$post('/v1/matchdata/get',{page:1})
          .then(data=>{
            if(data.error_code === 0 ){
              data.msg.forEach(v=>{
                that.matchData.unshift(v);
              })
            }
          })
      },
      exit(){
        this.$store.commit('changeIsLogin',0);
        sessionStorage.setItem('isLoginState',0);
        this.$router.push({path:'/Login'});

      }
    },
    computed: {
      screenLevel(){
        return this.$store.state.screenLevel;
      }
    },
    watch: {
      screenLevel(val){
        if(val == 0){
          console.log('screen<786px');
          this.dialogLabelPosition = 'top';
        }
      }
    },
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
      //完成挂载
      let that = this;
      this.getMatchData(that);

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

<style scoped>
  .block-content{
    padding:0 !important;
  }
  .row{
    width:100%;
  }


  .el-date-editor--daterange{
    width: 100%;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    float: left;
    text-align: left;
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .cell{
    text-align: left;
  }
</style>
