<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>查询账号</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="managerList" style="margin-top: 20px">
            <el-table-column label="账号" prop="manAccount"></el-table-column>
            <el-table-column label="身份证" prop="manId"></el-table-column>
            <el-table-column label="性别" prop="manSex" :formatter="sexFormatter"></el-table-column>
            <el-table-column label="手机号" prop="manTelNumber"></el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">
                    <el-input size="mini" placeholder="请输入账户名查询" v-on:input="lazyfindList"
                              v-model="searchParam"></el-input>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="deleteManager(scope)">删除</el-button>
                    <el-button size="mini" @click="updateManager(scope)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px"
                       background
                       layout="prev,pager,next,total"
                       :total="pageInfo.total"
                       :page-size="pageInfo.pageSize"
                       :current-page.sync="pageInfo.pageNum"
                       @current-change="findList"
        ></el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Account",
        //生命周期钩子，当vue实例中的data、方法、计算属性等等对象加载之后执行该函数
        created() {
            this.findList();
        },
        methods: {
            /**
             * 更新manger对象
             */
            updateManager(scope){
                //进入更新页面，并且将数据带给更新的页面
                this.$router.push({name:"UpdateAccount",params:scope.row});
            },

            deleteManager(scope) {
                this.$confirm('是否确认删除该条记录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: "error"
                }).then(() => {
                    //发送删除的请求
                    this.$axios.delete("/api/manager/"+scope.row.manAutoId).then(resp=>{
                        if(resp.data==='success'){
                            this.$notify({
                                type:"success",
                                message:"删除成功"
                            });
                            //刷新数据
                            this.findList();
                        }
                    })
                })
            },

            //延迟加载查询请求的执行
            lazyfindList() {
                this.findList();
            },


            sexFormatter(row, column) {
                return row.manSex === 'm' ? "男" : "女"
            },
            /**
             * 查询表格数据以及对应分页信息的方法
             */
            findList() {
                this.$axios.post("/api/manager/find", {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize,
                    condition: {
                        manAccount: this.searchParam
                    }
                }).then(resp => {
                    // console.log(resp.data);
                    //1. 将data中的数据赋值给managerList数组
                    this.managerList = resp.data.list;
                    //2. 将分页信息中的total, pageNum,pageSize交给前台的pageInfo对象
                    this.pageInfo.pageSize = resp.data.pageSize;
                    this.pageInfo.total = resp.data.total;
                    this.pageInfo.pageNum = resp.data.pageNum;
                })
            }
        },
        data() {
            return {
                managerList: [],
                pageInfo: {
                    pageSize: 5, //每页条目数
                    pageNum: 1, //当前页码
                    total: 0
                },
                searchParam: ""
            }
        }
    }
</script>

<style scoped>

</style>
