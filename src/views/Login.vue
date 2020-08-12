<template>
    <div>
        <img src="../assets/logo.png"/>
        <h1>航空订票管理系统</h1>
        <div class="input-wrapper">
            <el-input v-model="user.username" placeholder="请输入用户名"/>
        </div>
        <div class="input-wrapper">
            <el-input v-model="user.password" placeholder="请输入密码" show-password/>
        </div>
        <div class="input-wrapper">
            <el-button type="primary" v-on:click="login">登录</el-button>
            <el-button type="danger" v-on:click="clear">清空</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login.vue",
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            clear() {
                this.user.username = '';
                this.user.password = '';
            },
            login() {
                this.$axios.post('/api/login', {
                    manAccount: this.user.username,
                    manPwd: this.user.password
                }).then(response => {
                    //成功以后，跳转到首页
                    this.$router.push({path: "/index"});
                }).catch(error => {
                    //登录失败给提示
                    this.$message.error("用户名或密码输入错误");
                })
                //this.$router.push({path:"/index"});
            }
        }
    }
</script>

<style scoped>
    img {
        width: 300px;
        heigh: 200px;
    }

    .input-wrapper {
        width: 400px;
        margin: 10px auto;

    }
</style>
