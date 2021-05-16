<template>
    <div>
        {{"hello"|capitalize}}
        <loading :isshow="isShow"></loading>
        <el-form :v-modle="search" inline="">
            <el-form-item label="所属分类">

            </el-form-item>
            <el-form-item label="油漆名称">
                <el-input v-model="search.sname"></el-input>
            </el-form-item>
            <el-form-item label="油漆城市">
                <el-input v-model="search.scity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch"> 搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="stayhome">
            <el-table-column label="ID" prop="sid"></el-table-column>
            <el-table-column label="名称" prop="sname"></el-table-column>
            <el-table-column label="名称" prop="sname"></el-table-column>
            <el-table-column label="描述" prop="sdesc"></el-table-column>
            <el-table-column label="价格" prop="sprice"></el-table-column>
            <el-table-column label="标签" >
                <template slot-scope="scope">
                    <button class="el-button" v-for="item in scope.row.stag.split(/,|，/)" :key="item">{{item}} </button>
                </template>

            </el-table-column>
            <el-table-column label="缩略图" prop="sthumb">

                <template slot-scope="scope">

     <img :src="scope.row.sthumb" alt="" style="width: 20px;height: 20px;">
                </template>
            </el-table-column>
            <el-table-column label="城市" >
                <template slot-scope="scope">
                    <span>{{scope.row.sprovince}}---{{scope.row.scity}}---{{scope.row.sarea}}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.ctime|date('hh:mm:ss yyyy-MM-dd')}}   </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="info"><router-link :to="{name:'stayhomeedit',params:{id:scope.row.sid}}">编辑</router-link>
                    </el-button>
                    <el-button type="danger" ><router-link :to="{name:'stayhomeedit',params:{id:scope.row.sid}}">删除</router-link>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">

            <el-pagination
                    :current-page.sync="paginate.page"

                    :page-sizes="[3, 2, 4, 5]"
                    :page-size="paginate.limit"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import instance from "../../../http/http";
    import Loading from "../../../components/loading/Loading"
    import filter from "../../../filter/index";
    import {IMGURL} from "../../../lib/base";

    filter
    export default {
        name: "Stayhomeindex",

        components: {
            Loading
        },
        filters:{
            // capitalize: function (value) {
            //     if (!value) return ''
            //     value = value.toString()
            //     return value.charAt(0).toUpperCase() + value.slice(1)
            // },
            setdate:function (value,format='yyyy-MM-dd') {
                var date = new Date(value*1000);
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
                }
                let o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for(let k in o){
                    if (new RegExp(`(${k})`).test(format)) {
                        let str = o[k] + '';
                        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return format;

            }
        },
        data() {
            return {
                search: {sname: '', scity: '', cid: ''},
                paginate: {limit: 4, page: 1},
                stayhome: [],
                total: 0,
                isShow: false,
                IMGURL

            }
        },

        methods: {
            initStayhome() {
                this.isShow = true;
                let params = Object.assign({}, this.search, this.paginate)
                instance.get('/api/stayhome', {
                    params
                }).then(res => {
                    // console.log(res);
                    if (res.data) {
                        let data=res.data;
                           data= data.map(ele=> {
                          ele.sthumb=IMGURL+ ele.sthumb;
                          return ele;

                       }) ;
                        this.stayhome = data;
                        this.total = res.total;
                        this.isShow = false;
                    }else {
                        alert("无页面")
                        this.$message.error("无页面");
                        this.$router.go(0);
                    }

                }).catch(error => {
                    console.log(error);

                })
            }, handleSizeChange(val) {
                this.paginate.limit=val;
                this.paginate.page=1;
                this.initStayhome();
            },
            handleCurrentChange(page){
                this.paginate.page=page;
                this.initStayhome();
            },
            handleSearch(){
                this.paginate.page=1;
                this.initStayhome();
            }
        },
        mounted() {
            this.initStayhome();
        }
    }
</script>

<style scoped>

</style>