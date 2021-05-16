<template>
    <div>
        <el-form :model="passform" :rules="passrules" ref="passform">
            <el-form-item label="旧密码" autocomplete="off" autofocus>
                <el-input v-model="passform.oldpass" placeholder="请输入原来的密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="passform.newpass" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码">
                <el-input v-model="passform.newpassagain" placeholder="再次输入新密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handlerSubmit">提交</el-button>
        </el-form>
    </div>
</template>
<script>
    import {URL, SUCCESS} from "../../../lib/base";
    export default {
        name: "Changepass"
        , data() {
            return {
                passform: {
                    oldpass: '',
                    newpass: '',
                    newpassagain: '',
                },
                passrules: {}
            }
        },
        methods: {
            handlerSubmit() {
                SUCCESS
                let token =sessionStorage.getItem("token");

                let url = URL + 'admin/login/updatepassword'
                this.$http({
                    method: "POST",
                    url,
                    params:this.passform,
                    headers: {
                        token
                    }
                }).then(res => {
                    console.log(res);
                    if (res.data.code===SUCCESS && res.status === 200){
                        this.$message.success(res.data.msg);
                        sessionStorage.clear();
                        this.$router.push('/login');
                    }else
                    {
                        this.$message.error(res.data.msg) ;
                    }
                }).catch(() => {
                })
            }
        }
    }
</script>
<style scoped>
</style>