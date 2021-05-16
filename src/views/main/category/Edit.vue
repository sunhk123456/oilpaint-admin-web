<template>
    <div>
        <el-form :model="category" :rules="categoryRules" ref="categoryForm" v-if="category">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="category.cname" placeholder="'输入分类名称"></el-input>

            </el-form-item>
            <el-form-item label="分类描述" prop="cdesc">
                <el-input v-model="category.cdesc" placeholder="'输入分类描述"></el-input>

            </el-form-item>
            <el-input v-model="category.cid"  type="hidden"></el-input>
            <el-button type="primary" @click="handlerSubmit">提交</el-button>
        </el-form>

    </div>
</template>

<script>
    import axios from 'axios';
    import {URL} from "../../../lib/base";
    import {SUCCESS} from "../../../lib/base";



    export default {
        name: "Add",
        data() {
            let validateCname = (rule, value, callback) => {
                if(value==''){
                    callback(new Error('分类的名称不为空'))
                }else if(!(/[\u4e00-\u9fa5]{2,6}/.test(value))){
                    callback(new Error('分类的名称必须在汉字2-6位之间'))
                    // callback();
                }else{
                    callback();
                }
            }
            return {
                category:null,
                // category:{},
                categoryRules: {
                    cname: [

                        {validator: validateCname, trigger: 'blur'}

                    ],
                    cdesc: [

                        { required: true, message: '必填', trigger: 'blur' },
                        { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }

                    ]
                }
            }
        },
        methods:{
            handlerSubmit(){
                this.$refs.categoryForm.validate(validate=>{
                    console.log(validate);
                    if(validate){
                        let url=URL+"admin/category/edit"
                        let token=sessionStorage.getItem('token');

                        axios({
                            url,
                            method: "POST",
                            data:this.category,
                            headers:{
                                token
                            }
                        }).then(res=>{
                            console.log(res);
                            if (res.status===200&&res.data.code===SUCCESS){
                                this.$message.success(res.data.msg);
                            }
                        }).catch(()=>{
                            this.$message.error("分类添加失败");
                        })
                    }
                })
            },
            initCategory(cid){
                let url=URL+"admin/category/read"
                let token=sessionStorage.getItem('token')
                axios({
                    method: "GET",
                    url:url,
                    params:{cid},
                    headers:{
                        token,
                    }
                }).then(res=>{
                    if (res.status===200&&res.data.code===SUCCESS){
                        if (res.data.data){
                            this.category=res.data.data;
                        }else {
                            this.message.error(res.data.msg);
                        }
                    }
                    SUCCESS
                    console.log(res);
                }).catch(()=>{

                })
            }
        },
        mounted() {
           let {cid}= this.$route.query;
            this.initCategory(cid);
        }
    }
</script>

<style scoped>

</style>