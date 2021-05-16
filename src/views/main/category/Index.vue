<template>
    <div>
        <template>
            <el-form :inline="true" >
                <el-form-item label="分类名称">
                    <el-input v-model="sreach.cname" placeholder="分类名称"></el-input>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="headleSreach">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="categoryries">
                <el-table-column prop="cid" label="id" width="180">
                </el-table-column>
                <el-table-column prop="cname" label="分类名称" width="180">
                </el-table-column>
                <el-table-column prop="cdesc" label="分类描述">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row.cid)" type="text" size="small" >编辑</el-button>
                        <el-button type="text" size="small" @click="handleDel(scope.row.cid)" >删除</el-button>
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

            handleEdit(cid) {


                this.$router.push({path: '/categoryedit', query: {cid}});
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
                let url = URL + 'admin/category/index';

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