<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-active='activeMenu'>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-document-copy"></i>内容管理
                    </template>
                    <el-menu-item index="/articles/index">文章列表</el-menu-item>
                    <el-menu-item index="/articles/create">新建文章</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-custom"></i>人员管理
                    </template>
                    <el-menu-item index="/employee/list">人员列表</el-menu-item>
                    <el-menu-item index="/employee/add">新增人员</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return {
                
            }
        },
        created(){
            console.log(this.$route)
        },
        computed:{
            activeMenu(){
                return this.$route.path
            }
        }
    }
</script>