<template>
    <div>
        <template>
            <el-form :inline="true" >
                <el-form-item label="留言页面">
                    <el-input v-model="sreach.cname" placeholder="留言页面"></el-input>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="headleSreach">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="categoryries">
                <el-table-column prop="id" label="id" width="180">
                </el-table-column>
                <el-table-column prop="title" label="油漆页面" width="180">
                </el-table-column>
                <el-table-column prop="model" label="油漆模块" width="180">
                </el-table-column>
                <el-table-column prop="description" label="油漆描述">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100" prop="deal" >
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row.id)" v-if="!scope.row.deal" type="text" size="small" >添加留言</el-button>
                        <div v-else> {{scope.row.deal}}
                            <el-button @click="handleEdit(scope.row.id)" type="text" size="small" >点击修改</el-button>

                        </div>
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
                        width="160"
                        v-model="visible" style="position: fixed;top: 100px">
                    <p>这是一段内容这是一段内容确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
<!--                    <el-button slot="reference">删除</el-button>-->
                </el-popover>
                <div style=""></div>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';
    import {URL, SUCCESS} from "../../../lib/base";

    export default {
        name: "index",
        data() {
            return {
                //搜索条件
                visible:true,
                sreach: {cname: '',},
                //分页
                paginate: {
                    limit: 2,
                    page: 1
                },
                categoryries: [],
                total: 0

            };
        },
        methods: {

            handleEdit(id) {
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
                let url = URL + 'api/LeaveMessage';

                let token = sessionStorage.getItem('token');
                let params = Object.assign({}, this.paginate, this.sreach);
                axios({
                    method: "GET",
                    url,
                    params,
                    headers: {
                        token
                    }
                }).then(res => {
                    if (res.status === 200 && res.data.code === SUCCESS) {
                        if (res.data.data) {
                            console.log(res.data.data);
                            this.categoryries = res.data.data;
                            this.total = res.data.total;

                        } else {
                            this.$message.info(res.data.msg);
                        }
                    } else {
                        console.log("error");
                    }
                    console.log(res);
                }).catch(() => {

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
            }
        },
        mounted() {
            this.initCategory();
        }

    }
</script>

<style scoped>

</style>