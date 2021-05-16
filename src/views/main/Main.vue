<template>
<div class="app">

    <el-container class="main-box">
        <el-header>
            <img src="../../img/1.jpg" alt="" >
            <div class="nav">
                <el-menu mode="horizontal">
                    <el-menu-item index="1">指南</el-menu-item>
                    <el-submenu  index="2">
                        <template slot="title"> 菜单</template>

                        <el-menu-item> <router-link to="/changepass"> 修改密码</router-link></el-menu-item>
                        <el-menu-item>退出登录</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu>
                    <el-submenu index="1">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span slot="title">导航栏的管理</span>
                        </template>
                        <el-menu-item>
                         <router-link to="/categoryadd"> 导航添加</router-link>
                        </el-menu-item>
                        <el-menu-item>
<!--                            <router-link to="/categoryindex"> 导航查看</router-link>-->
                            <router-link :to="{path:'/categoryindex'}"> 导航查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title" >
                            <i class="el-icon-location"></i>
                            <span slot="title">油漆分类的管理</span>
                        </template>
                        <el-menu-item>
                            <router-link to="/stayhomeadd"> 油漆的添加</router-link>
                        </el-menu-item>
<!--                        <el-menu-item>-->
<!--                            <router-link :to="{path:'/categoryindex'}"> 分类查看</router-link>-->
<!--                        </el-menu-item>-->
                        <el-menu-item>
                            <router-link :to="{path:'/stayhomeindex'}">油漆的查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>

</div>
</template>

<script>
    export default {
        name: "Main",


    }
</script>

<style scoped>

</style>

<style scoped>
    a{
        color: #000;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;

    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;

    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;

    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {

    }

    .el-container:nth-child(7) .el-aside {

    }
    .main-box{
        position:absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

    }
    .el-header{
        display: flex;
        justify-content: space-between;
    }
    .el-header .nav{
        width: 200px;
        height: 100%;
        background: red;
        /*float: right;*/
    }
    .el-header img{
        margin-top: 0.5%;
        height: 80%;
        margin-left: 4%;
    }
</style>