<template>
    <div>

        <Loading :isshow="showloading"></Loading>
        <el-form :model="stayhomeform" ref="stayhomeform">
            <el-form-item label="所属分类">
                <el-select v-model="stayhomeform.cid" placeholder="请选择">
                    <el-option
                            v-for="item in categorys"
                            :key="item.value"
                            :label="item.cname"
                            :value="item.cid">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="油漆名称">
                <el-input v-model="stayhomeform.sname"></el-input>
            </el-form-item>
            <el-form-item label="油漆描述">
                <el-input type="textarea" v-model="stayhomeform.sdesc"></el-input>
            </el-form-item>
            <el-form-item label="油漆标签">
                <el-input v-model="stayhomeform.stag"></el-input>
            </el-form-item>
            <el-form-item label="油漆评分">
                <el-input v-model="stayhomeform.score"></el-input>
            </el-form-item>

            <el-form-item label="油漆价格">
                <el-input v-model="stayhomeform.sprice"></el-input>
            </el-form-item>
            <el-form-item label="油漆省份">
                <el-select v-model="stayhomeform.sprovince" @input="querycity">
                    <el-option v-for="(item,index) in province" :value="item" :label="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="油漆城市">
                <el-select v-model="stayhomeform.scity" @input="queryarea">
                    <el-option v-for="(item,index) in cityList" :value="item" :label="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="油漆区域">
                <el-select v-model="stayhomeform.sarea">
                    <el-option v-for="(item,index) in areaList" :value="item" :label="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="油漆地址">
                <el-input v-model="stayhomeform.saddress"></el-input>
            </el-form-item>
            <el-form-item label="油漆缩略图">
                <br>
                <el-upload
                        class="avatar-uploader"
                        :action="imgthumburl"
                        :show-file-list="false"
                        :on-success="handlesthumbSuccess"
                        :before-upload="beforeAvatarUpload">
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过500kb</div>
                    <img v-if="stayhomeform.sthumb" :src="IMGURL+stayhomeform.sthumb" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon  juzhong"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="油漆轮播图">
                <br>
                <el-upload
                        :action="imgthumburl"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :on-success="handlesbannerSuccess"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus "></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过500kb,最多上传五张</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <el-form-item label="油漆详情">

                </el-form-item>
                <el-form-item>
                    <rich-text @rich-change="setdata" formview="sdetailaaaa" formfile="sdetail"></rich-text>
                </el-form-item>
            </el-form-item>
            <el-form-item label="使用须知">
                <br>

            </el-form-item>

            <rich-text @rich-change="setdata" formview="aaaa" formfile="snotice" :menus="['head',
        'bold',
        'italic',
        'underline']"></rich-text>
            <el-button @click="submitForm">提交</el-button>
        </el-form>
    </div>
</template>
<script>
    import {SUCCESS, URL,IMGURL} from "../../../lib/base";
    import Loading from "../../../components/loading/Loading"
    import instance from "../../../http/http";
    import RichText from "../../../components/rich-text/RichText"
    import city from "../../../lib/city";
    import {categorySave} from "../../../http/category";

    export default {
        name: "Stayhome",
        components: {
            Loading,
            RichText
        },
        data() {
            return {
                bannerimgURL: '',
                dialogImageUrl: '',
                dialogVisible: false,
                showloading: true,
                imgURL: '',
                imgthumburl: URL + "admin/upload/index",
                categorys: [],
                stayhomeform: {
                    sname: '',
                    sdesc: '',
                    sthumb: '',
                    sprice: '',
                    scity: '',
                    sarea: '',
                    saddress: '',
                    stag: '',
                    sbanner: '',
                    snotice: '',
                    sdetail: '',
                    cid: '',
                    score: '',
                    sprovince: '',
                },
                bannerarr: [],
                city,
                province: [],

            };

        },
        computed: {
            cityList() {
                let cityList = [];
                if (this.city.length) {
                    var current = this.city.find(ele => ele.name === this.stayhomeform.sprovince);
                    cityList = current && current.city.map(ele => ele.name);
                }
                return cityList;
            },
            areaList() {
                let areaList = [];
                if (this.city.length) {
                    var current = this.city.find(ele => ele.name === this.stayhomeform.sprovince);
                    if (current) {
                        var areacurrent = current.city.find(ele => ele.name === this.stayhomeform.scity)
                        areacurrent
                        areaList = areacurrent.area
                    }
                }
                return areaList;

            }
        },
        methods: {
            initCategory() {
                categorySave().then(res=>{
                    console.log(res);
                    if ( res.code === SUCCESS) {
                            this.showloading = false;
                            if (res.data) {
                                this.categorys = res.data;
                            }
                        }
                }).catch(error=>{
                    console.log(error);
                });
                // categoryIndex();
                // instance.get('admin/category/indexall').then(res=>{
                //     if ( res.code === SUCCESS) {
                //         this.showloading = false;
                //         if (res.data.data) {
                //             this.categorys = res.data.data;
                //         }
                //     }
                // }).catch()
            },
            textAxios() {
                instance.get('admin/category/indexall').then(res => {
                    // console.log(res);
                    res
                }).catch(() => {
                })
            },
            handlesthumbSuccess(res, file) {
                file
                console.log(res);
                this.stayhomeform.sthumb = res.imgURL;

            },
            beforeAvatarUpload(file) {
                const geshi = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                const isgeshi = geshi.some(ele => ele == file.type)

                const isLt = file.size / 1024 < 500;
                if (!isgeshi) {
                    this.$message.error('上传图片只能是 JPG 、jpeg、png、webp格式!');
                }
                if (!isLt) {
                    this.$message.error('上传头像图片大小不能超过 500kB!');
                }
                return isgeshi && isLt;
            },
            handleRemove(file, fileList) {
                // console.log(file, fileList);
                fileList
                // console.log("删除后的");
                let url = file.response.imgURL;
                this.bannerarr = this.bannerarr.filter(ele => ele != url);
                this.stayhomeform.sbanner = this.bannerarr.join(',');

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handlesbannerSuccess(res) {
                this.bannerarr.push(res.imgURL);
                this.stayhomeform.sbanner = this.bannerarr.join(',');
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);

            },
            setdata(html, data) {
                this.stayhomeform[data] = html;

            },
            setProvince() {

                this.province = this.city.map(ele => ele.name);

            },
            setCitylist() {

            },
            querycity() {
                if (this.city.length) {
                    let current = this.city.find(ele => ele.name === this.stayhomeform.sprovince);
                    // console.log();
                    this.stayhomeform.scity = current.city[0]['name'];

                    if (current) {
                        var areacurrent = current.city.find(ele => ele.name === this.stayhomeform.scity)
                        this.stayhomeform.sarea = areacurrent.area[0];
                    }
                }
            },
            queryarea(){
                if (this.city.length) {
                    let current = this.city.find(ele => ele.name === this.stayhomeform.sprovince);
                    if (current) {
                        var areacurrent = current.city.find(ele => ele.name === this.stayhomeform.scity)
                        this.stayhomeform.sarea = areacurrent.area[0];
                    }
                }
            },
            submitForm(){
                let url=URL +"api/stayhome"
                var date = new Date();
                var now = date.getTime();
                this.stayhomeform.ctime=now/1000;

                let token=sessionStorage.getItem("token");
                this.$http({
                    method: "POST",
                    url,
                    params:this.stayhomeform,
                    headers: {
                        token
                    }


                }).then(res=>{
                    console.log(res.data);
                    if (res.data.code===SUCCESS&&res.status===200){
                        this.$message.success(res.data.msg);
                        this.$router.push("/");
                    }
                }).catch(()=>{

                })

            }
        },
        mounted() {
            this.initCategory();
            this.textAxios();
            this.setProvince();
            this.IMGURL=IMGURL;

        }

    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style scoped>
    .juzhong{
     position: relative;
        top:70px;



    }
</style>