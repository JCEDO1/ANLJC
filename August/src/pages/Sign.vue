<template>
  <div>
    <div style="width: 95%;" class="center">
      <el-tabs type="border-card">
        <el-tab-pane label="运动员注册">
          <div class="block-content">

            <el-form :model="athleteForm"
                     ref="athleteForm"
                     :rules="athleteRules"
            >
              <el-form-item label="运动员名称:"  prop="name">
                <el-input v-model="athleteForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别:"  prop="sex">
                <el-input v-model="athleteForm.sex" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="民族:"  prop="nation">
                <el-input v-model="athleteForm.nation" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码:"  prop="identify">
                <el-input v-model="athleteForm.identify" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:"  prop="contactphone">
                <el-input v-model="athleteForm.contactphone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:"  prop="email">
                <el-input v-model="athleteForm.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="省份:"  prop="province">
                <el-input v-model="athleteForm.province" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="详细地址:"  prop="address">
                <el-input v-model="athleteForm.address" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人:"  prop="econtactname">
                <el-input v-model="athleteForm.econtactname" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话:"  prop="econtactphone">
                <el-input v-model="athleteForm.econtactphone" auto-complete="off"></el-input>
              </el-form-item>

            </el-form>
            <div slot="footer" class="buttonGroup">
              <el-button type="primary" @click="submitForm('athleteForm')">确 认</el-button>
              <el-button @click="resetForm('athleteForm')">重 置</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="裁判员注册">
          <div class="block-content">
            <el-form
              :model="coachForm"
              ref="coachForm"
              :rules="coachRules">
              <el-form-item label="姓名" prop="name"> <el-input v-model="coachForm.name" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="性别" prop="sex"> <el-input v-model="coachForm.sex" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="民族" prop="nation"> <el-input v-model="coachForm.nation" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="身份证" prop="identify"> <el-input v-model="coachForm.identify" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="联系电话" prop="phone"> <el-input v-model="coachForm.phone" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="电子邮箱" prop="email"> <el-input v-model="coachForm.email" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="省份" prop="province"> <el-input v-model="coachForm.province" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="地址" prop="address"> <el-input v-model="coachForm.address" auto-complete="off"></el-input> </el-form-item>
              <el-form-item label="登陆密码" prop="password"> <el-input v-model="coachForm.password" auto-complete="off"></el-input> </el-form-item>
            </el-form>
            <div slot="footer" class="buttonGroup">
              <el-button type="primary" @click="submitForm('athleteForm')">确 认</el-button>
              <el-button @click="resetForm('coachForm')">重 置</el-button>
            </div>
          </div>
        </el-tab-pane>

      </el-tabs>

    </div>

  </div>
</template>

<script>
  export default{
    name:'Sign',
    data(){
      var checkPureNum = (rule,value,callback)=>{
        var s = /^(?!\d+)[\u4e00-\u9fffa-zA-Z\d\-_]+$/
        if(!s.test(value)){
          return callback(new Error('不可以只包含数字'))
        }else{
          callback()
        }
      }
      var checkPureCN = (rule,value,callback) =>{
        var s =/^[\u4e00-\u9fa5]+$/
        if(!s.test(value)){
          return callback(new Error('只可以输入中文字符'))
        }else{
          callback()
        }
      }
      var checkIdentfy = (rule,value,callback) =>{
        var s = /^\d{17}(\d|[A-Z]){1}$/;
        if(!s.test(value)){
          return callback(new Error('身份证有误，请核对'))
        }else{
          callback()
        }
      }
      var checkEmail = (rule,value,callback) =>{
        var s = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(!s.test(value)){
          return callback(new Error('请输入正确的邮箱地址'))
        }else{
          callback()
        }
      }
      var checkPhoneNum = (rule,value,callback) =>{
        var s =/^\d{11}$/
        if(!s.test(value)){
          return callback(new Error('请输入正确的手机号码'))
        }else{
          callback()
        }
      }
      return {
//运动员
        athleteForm:{
          name: '',
          sex: '',
          nation: '',
          identify: '',
          contactphone: '',
          email: '',
          province: '',
          address: '',
          econtactname: '',
          econtactphone: ''
        },
        athleteRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            { validator:checkPureCN , trigger:'blur'}

          ],
          sex: [
            {required: true, message: '请输入性别', trigger: 'blur'},
          ],
          nation: [
            {required: true, message: '请输入民族', trigger: 'blur'},
          ],
          identify: [
            {required: true, message: '请输入身份证号码', trigger: 'blur'},
            { validator:checkIdentfy, trigger:'blur'}
          ],
          contactphone: [
            {required: true, message: '请输入联系电话', trigger: 'blur'},
            { validator :checkPhoneNum ,trigger:'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            { validator:checkEmail , trigger:'blur'}
          ],
          province: [
            {required: true, message: '请输入省份', trigger: 'blur'},

          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
            { validator:checkPureNum , trigger:'blur'}
          ],
          econtactname: [
            {required: true, message: '请输入紧急联系人姓名', trigger: 'blur'},
            {validator :checkPureCN , trigger:'blur'}
          ],
          econtactphone: [
            {required: true, message: '请输入紧急联系人电话', trigger: 'blur'},
            { validator :checkPhoneNum ,trigger:'blur'}
          ]
        },
//教练员
        coachForm:{
          name:'',
          sex:'',
          nation:'',
          identify:'',
          phone:'',
          email:'',
          province:'',
          address:'',
          password:''
        },
        coachRules:{
          name:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
            {validator:checkPureCN , trigger:'blur'}
          ],
          sex:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
          ],
          nation:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
          ],
          identify:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
            { validator:checkIdentfy ,message:'请输入正确的身份证格式',trigger:'blur'}
          ],
          phone:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
            { validator:checkPhoneNum , trigger:'blur'}
          ],
          email:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
            { validator:checkEmail ,message:'请输入正确的邮箱格式',trigger:'blur'}
          ],
          province:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
            {validator:checkPureCN ,trigger:'blur'}
          ],
          address:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
            {validator:checkPureCN ,trigger:'blur'}
          ],
          password:[
            {required:true , message:'请输入名称' ,trigger:'blur'},
          ]
        }
      }
    },
    methods:{
      submitForm(formName){
        let that = this;
        let url = '';
        let req;
        if(formName == 'athleteForm'){
          url = '/v1/people/athlete_register';
          req = that.athleteForm;
        }else if(formName == 'coachForm'){
          url = '/v1/refree/create';
          req = that.coachForm;
        }else{
          alert('错误');
        }
        this.$refs[formName].validate((valid)=>{
          console.log(valid);
          if(valid){
            that.$post(url,req)
              .then(data=>{
                console.log(data);
              })
          }
        })
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .el-input{

  }
</style>
