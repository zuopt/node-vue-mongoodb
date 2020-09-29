<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-scrollbar wrap-class="scrollbar-wrapper">
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
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>系统管理
                        </template>
                        <el-menu-item index="/user/list">管理员列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
        </el-scrollbar>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-button type="text" @click="loginOut">注销</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{user}}</span>
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

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100%;
    }
</style>

<script>
    export default {
        data() {
            return {
                user:''
            }
        },
        created(){
            console.log(this.$route)
            let user = sessionStorage.getItem('username')
            this.user = user
        },
        computed:{
            activeMenu(){
                return this.$route.path
            }
        },
        methods:{
            loginOut(){
                sessionStorage.removeItem('user')
                sessionStorage.removeItem('token')
                this.$router.push('/login')
            }
        }
    }
</script>