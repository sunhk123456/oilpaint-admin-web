<template>
    <div>
        <template>
            <el-form :inline="true" >
                <el-form-item label="用户姓名">
                    <el-input v-model="sreach.cname" placeholder="输入用户姓名"></el-input>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="headleSreach">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="user">
                <el-table-column prop="uid" label="用户id" width="180">
                </el-table-column>
                <el-table-column prop="uname" label="用户姓名" width="180">
                </el-table-column>
                <el-table-column prop="uusername" label="用户用户名" width="180">
                </el-table-column>
                <el-table-column prop="upassword" label="用户密码">
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100" prop="deal" >
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row.uid)"  type="text" size="small" >删除用户</el-button>
                        <br>
                        <el-button @click="handleEdit2(scope.row.uid,scope.row.upassword)"  type="text" size="small" >修改密码</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="block">

                <el-pagination
                        :current-page.sync="paginate.page"
                        :page-size.sync="paginate.limit"
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
                <el-popover
                        placement="top"
                        width="260"
                        v-model="visible" style="position: fixed;top:200px;left:600px;z-index:201;">
                    <h1>是否删除</h1>
                    <!--                    <p>这是一段内容这是一段内容确定删除吗？</p>-->
                    <div style="text-align: right; margin: 0;padding-top:4px ">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="changeMessage">确定</el-button>
                    </div>
                    <!--                    <el-button slot="reference">删除</el-button>-->
                </el-popover>
                <el-popover
                        placement="top"
                        width="460"
                        v-model="visible2" style="position: fixed;top:200px;left:600px;z-index:201;">
                    <h1>留言信息</h1>
                    <el-input type="textarea" :rows="2" v-model="dealMessage"></el-input>
                    <div style="text-align: right; margin: 0;padding-top:4px ">
                        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="changeMessage2">确定</el-button>
                    </div>
                </el-popover>
                <div v-if="visible||visible2" style="background: #8c939d;position: absolute;height: 100%;top: 0;left: 0;width: 100%;opacity: 0.8;z-index: 100"></div>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL, SUCCESS} from "../../../lib/base";
    import {deleteUser} from "../../../http/user";
    import {updateUserPassword} from "../../../http/user";
    updateUserPassword

    export default {
        name: "index",
        data() {
            return {
                //搜索条件
                visible:false,
                visible2:false,
                sreach: {cname: '',},
                dealMessage:"11111",
                dealId:"",
                //分页
                paginate: {
                    limit:3,
                    page: 1
                },
                categoryries: [],
                user: [],
                total: 0

            };
        },
        methods: {

            handleEdit(id,deal) {
                console.log(deal)
                this.dealMessage="";
                // this.dealId="";
                this.dealId=id;

                if (deal){
                    this.dealMessage=deal;

                }
                this.visible=true;

                console.log(id)

            },
            handleEdit2(id,deal) {
                console.log(deal)
                this.dealMessage="";
                // this.dealId="";
                this.dealId=id;

                if (deal){
                    this.dealMessage=deal;

                }
                this.visible2=true;

                console.log(id)

            },
            handleDel(cid) {
                let url = URL + 'admin/category/del';
                let token = sessionStorage.getItem('token');
                axios({
                    method: "GET",
                    url,
                    params: {cid},
                    headers: {
                        token,
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.code === SUCCESS) {

                        if (res.data.data) {
                            this.$message.success(res.data.msg);
                            this.$router.go();
                        } else {
                            this.message.error(res.data.msg);
                        }
                    } else {
                        console.log("失败");
                    }
                }).catch(() => {

                })
            },
            initCategory() {
                let url = URL + 'api/user';
                url
                let token = sessionStorage.getItem('token');
                let params = Object.assign({}, this.paginate, this.sreach);
                // axios({
                //     method: "GET",
                //     url,
                //     params,
                //     headers: {
                //         token
                //     }
                // }).then(res => {
                //     if (res.status === 200 && res.data.code === SUCCESS) {
                //         if (res.data.data) {
                //             console.log(res.data.data);
                //             this.categoryries = res.data.data;
                //             this.total = res.data.total;
                //
                //         } else {
                //             this.$message.info(res.data.msg);
                //         }
                //     } else {
                //         console.log("error");
                //     }
                //     console.log(res);
                // }).catch(() => {
                //
                // })

                axios({
                    method: "GET",
                    url:'//localhost/oilPaint/public/api/User',
                    params,
                    headers: {
                        token
                    }
                }).then(res=>{

                    if (res.status === 200 && res.data.code === SUCCESS) {
                        if (res.data.data) {
                            console.log("index",res)
                            this.user=res.data.data.user;
                            this.total = res.data.total;

                        } else {
                            this.$message.info(res.data.msg);
                        }
                    } else {
                        console.log("error");
                    }
                    console.log(res);
                })


            },
            handleCurrentChange(page) {
                // console.log(page);
                this.paginate.page = page;
                this.initCategory();
            },
            headleSreach() {
                this.paginate.page = 1;
                this.initCategory();
            },
            changeMessage(){
                console.log("删除",this.dealId)
                deleteUser(this.dealId,
                    ).then(
                    res=>{
                        console.log("1",res)
                        if (res.code===200){
                            console.log(1)

                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.paginate.page=1;
                        this.initCategory();

                    }
                )
                this.visible = false


            },
            changeMessage2(){
                updateUserPassword(this.dealId,{password:this.dealMessage}
                ).then(
                    res=>{
                        console.log("1",res)
                        if (res.code===200){
                            console.log(1)

                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this.paginate.page=1;
                        this.initCategory();

                    }
                )
                this.visible2 = false


            }
        },
        mounted() {
            this.initCategory();
        }

    }
</script>

<style scoped>

</style>