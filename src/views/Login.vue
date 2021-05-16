<template>
    <div class="login">
<div style="display:flex;justify-content:center;">
    <div style="width:500px;margin-top:80px">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
            <el-form-item label="用户名" prop="uname" autocomplete="off">
                <el-input v-model.number="loginForm.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upassword">
                <el-input type="password" v-model="loginForm.upassword" autocomplete="off"></el-input>
            </el-form-item>
            <div style="display:flex;justify-content:center;">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
            </div>
        </el-form>
    </div>
</div>
        <div style="display:flex;justify-content:center;">
        <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width:520px;height:50px;margin-top:40px;display:flex;justify-content:center;">
            账号:zhangsan
            <br> 密码:123456
        </div>
        </div>
    </div>
</template>
<script>
    /*
    * 1. 权限验证 前台
    * 2.路由前置守卫
    * 3. 路由元信息
    * 3.登录成功后返回之前页面 地址栏添加查询字符串
    * */
    import {SUCCESS} from "../lib/base";
    import {URL} from "../lib/base";

    console.log(SUCCESS,URL);
    const axios = require('axios').default;
    export default {
        name: "Login",
        data() {
            var checkuname = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                } else {
                    callback();
                }

            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.loginForm.checkPass !== '') {
                        this.$refs.loginForm.validateField('checkPass');
                    }
                    callback();
                }
            };

            return {
                loginForm: {
                    upassword: '',

                    uname: ''
                },
                rules: {
                    upassword: [
                        {validator: validatePass, trigger: 'blur'}
                    ],

                    uname: [
                        {validator: checkuname, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm() {


                // this.$refs.loginForm.validate((valid) => {
                //     if (valid) {
                this.$refs.loginForm.validate(validate => {
                                    if (validate) {
                        /**
                         * 同源
                         * 跨域
                         * 1.代理
                         * 2.服务器端
                         * 3.jsonp
                         *
                         * @type {string}
                         */
                        let url = URL+'admin/login/check'
                        axios.post(url + '/admin/login/check', this.loginForm).then((res) => {
                            if (res.status === 200 && res.data.code === 200) {
                                sessionStorage.setItem('token', res.data.token);
                                let redirect = this.$route.query.redirect || "index";
                                this.$router.push({name: redirect});
                            } else {
                                this.$message.error(res.data.msg)
                            }
                        }).catch(error => {
                            console.log(error);
                        })


                    } else {
                        console.log('error submit!!');
                        return false;

                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>


<style scoped>

</style>