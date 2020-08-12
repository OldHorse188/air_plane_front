<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>{{title}}</h2>
        <el-form :model="manager"
                 label-width="100px"
                 style="width: 600px;text-align: center;margin:0 auto"
                 ref="managerForm"
                 :rules="rules">
            <el-form-item label="账户名：" prop="manAccount">
                <el-input v-model="manager.manAccount"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="manPwd">
                <el-input v-model="manager.manPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="secondPwd">
                <el-input v-model="manager.secondPwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="manSex">
                <el-radio-group v-model="manager.manSex">
                    <el-radio label="m" >男</el-radio>
                    <el-radio label="f" >女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="联系电话：" prop="manTelNumber">
                <el-input v-model="manager.manTelNumber"></el-input>
            </el-form-item>
            <el-form-item label="身份证：" prop="manId">
                <el-input v-model="manager.manId"></el-input>
            </el-form-item>
            <el-form-item label="email：" prop="manEmail">
                <el-input v-model="manager.manEmail"></el-input>
            </el-form-item>
            <el-form-item label="创建时间：" prop="manTime">
                <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="manager.manTime" style="width:100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbitManager">提交账户</el-button>
                <el-button @click="resetForm">取消</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>

    export default {
        name: "AddAccount",
        mounted() {
            //判断是否是从更新按钮挑过来的
            let man= this.$route.params;
            if(man.manAutoId){
                this.manager = man;
            }
        },
        data () {
            // rule是整个验证规则对象，value是控件当前的值，callback回调，如果需要传错误信息，callback(new Error('错误信息'))
            let checkPass = (rule,value,callback)=>{
                //value不能为空
                if(value===''){
                    callback(new Error("不能为空"))
                }else if(value!==this.manager.manPwd){
                    callback(new Error("两次密码不一致"))
                }else{
                    callback();
                }
            }

            let checkPhoneNum = (rule,value,callback) =>{
                if(value===""){
                    callback(new Error("手机号不能为空"));
                    return;
                }
                let pattern  = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
                if(pattern.test(value)){
                    callback();
                }else{
                    callback(new Error("手机号格式错误"));
                }
            }

            let checkId = (rule,value,callback) =>{
                if(value===""){
                    callback(new Error("身份证不能为空"));
                    return;
                }
                let pattern  = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if(pattern.test(value)){
                    callback();
                }else{
                    callback(new Error("身份证格式错误"));
                }
            }

            let checkEmail = (rule,value,callback) =>{
                if(value===""){
                    callback(new Error("email不能为空"));
                    return;
                }
                let pattern  = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(pattern.test(value)){
                    callback();
                }else{
                    callback(new Error("email格式错误"));
                }
            }

            return {
                title:"添加账号",
                manager:{
                    manAutoId:undefined,
                    manAccount:"",
                    manPwd:"",
                    manId:"",
                    manSex:"",
                    manTelNumber:"",
                    manEmail:"",
                    manTime:"",
                    secondPwd:""
                },
                rules:{
                    manAccount:[
                        {required:true,message:"账户名不能为空",trigger:"blur"},
                        {min:3,max:8,message:"长度3-8之间",trigger: "blur"}
                    ],
                    manPwd:[
                        {required:true,message:"密码不能为空",trigger:"blur"},
                        {min:6,max:12,message:"密码长度6-12之间",trigger: "blur"}
                    ],
                    //secondPwd需要定义定义的验证规则checkPass方法
                    secondPwd:[
                        {validator:checkPass,trigger:"blur"}
                    ],
                    manSex:[
                        {required:true,trigger:"change",message:'性别不能为空'}
                    ],
                    manTelNumber:[
                        {validator:checkPhoneNum,trigger:"blur"}
                    ],
                    manId:[
                        {validator:checkId,trigger:"blur"}
                    ],
                    manEmail:[
                        {validator:checkEmail,trigger:"blur"}
                    ],
                    manTime:[
                        {required:true,message:"创建日期不能为空",trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            /**
             * 清空表单数据
             */
            resetForm (){
                this.$refs['managerForm'].resetFields();
            },

            /**
             * 提交表单数据
             */
            sumbitManager () {
                //通过ref属性获得表单对象，调用validate方法来进行全局验证
                this.$refs['managerForm'].validate(valid=>{
                    if(valid){
                        //提交数据
                        this.$axios.post('/api/manager',{
                            manAutoId:this.manager.manAutoId,
                            manAccount:this.manager.manAccount,
                            manPwd:this.manager.manPwd,
                            manId:this.manager.manId,
                            manSex:this.manager.manSex,
                            manEmail:this.manager.manEmail,
                            manTime:this.manager.manTime,
                            manTelNumber:this.manager.manTelNumber
                        }).then(response=>{
                          if(response.data==='success'){
                              //弹出成功提示，并且清空form表单
                              this.$notify({
                                  message:"数据保存成功",
                                  type:"success"
                              })
                              //清空form表单
                              this.resetForm();
                          }else{
                              //弹出失败提示，并且清空form表单
                              this.$notify({
                                  message:"数据保存失败",
                                  type:"error"
                              })
                              //清空form表单
                              this.resetForm();
                          }
                        })
                    }else{
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
