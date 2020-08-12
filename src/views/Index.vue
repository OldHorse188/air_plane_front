<template>
    <el-container>
        <el-header>
            <el-menu
                    background-color="#2F2F2D"
                    text-color="#C0C4CC"
                    active-text-color="#67C23A"
                    mode="horizontal"
                    :router="true">
                <el-menu-item index="/index/customer">订票客户管理</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">航空订票管理</template>
                    <el-menu-item index="/index/review">订票审核</el-menu-item>
                    <el-menu-item index="/index/restore">退票管理</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">航班信息管理</template>
                    <el-menu-item index="/index/airinfo">航班查询</el-menu-item>
                    <el-menu-item index="/index/addair">增加航班信息</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">账号管理</template>
                    <el-menu-item index="/index/addaccount">添加账号</el-menu-item>
                    <el-menu-item index="/index/account">账号查询</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">机型管理</template>
                    <el-menu-item index="/index/addtype">添加机型</el-menu-item>
                    <el-menu-item index="/index/type">查询机型</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-main>
            <!--嵌套子路由入口-->
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Index.vue"
    }
</script>

<style scoped>

</style>
