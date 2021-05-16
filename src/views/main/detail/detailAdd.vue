<template>
    <div>

        <Loading :isshow="showloading"></Loading>
        <el-form :model="stayhomeform" ref="stayhomeform">

            <el-form-item label="油漆名称">
                <el-input v-model="stayhomeform.sname"></el-input>
            </el-form-item>


            <el-form-item label="油漆价格">
                <el-input v-model="stayhomeform.sprice"></el-input>
            </el-form-item>
            <el-form-item label="油漆描述">
                <el-input v-model="stayhomeform.comments"></el-input>
            </el-form-item>
            <el-form-item label="油漆型号">
                <el-input v-model="stayhomeform.cms"></el-input>
            </el-form-item>
            <el-form-item label="油漆评价导航">
                <el-input v-model="stayhomeform.detailnavtab"></el-input>
            </el-form-item>
            <el-form-item label="油漆详情图">
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

            </el-form-item>
            <el-form-item label="油漆颜色图">
                <br>
                <el-upload
                        :action="imgthumburl"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :on-success="handlesbannerSuccess1"
                        :on-remove="handleRemove1"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload">

                    <i class="el-icon-plus "></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过500kb,最多上传五张</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

            </el-form-item>
            <el-form-item label="油漆评价详情图">
                <br>
                <el-upload
                        :action="imgthumburl"
                        list-type="picture-card"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :on-success="handlesbannerSuccess2"
                        :on-remove="handleRemove2"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload"
                       >
                    <i class="el-icon-plus "></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/webp文件，且不超过500kb,最多上传五张</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>

            </el-form-item>
            <el-form-item label="油漆详情">

            </el-form-item>
            <el-form-item>
                <rich-text @rich-change="setdata" formview="" formfile="sdetail"></rich-text>
            </el-form-item>


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
                    cms:'',
                    comments:'',
                    detailnavtab:'',

                    colors:'',
                    desc:'',
                    model:'',
                    sname: '',
                    sprice: '',
                    stag: '',
                    sbanner: '',
                    snotice: '',
                    sdetail: '',
                    cid: '',
                    score: '',
                    sprovince: '',
                },
                bannerarr: [],
                bannerarr1: [],
                bannerarr2: [],
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
            //上传前的文件大小限制
            beforeAvatarUpload(file) {
                const geshi = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                const isgeshi = geshi.some(ele => ele == file.type)

                // const isLt = file.size / 1024 < 500;
                if (!isgeshi) {
                    this.$message.error('上传图片只能是 JPG 、jpeg、png、webp格式!');
                }
                // if (!isLt) {
                //     this.$message.error('上传头像图片大小不能超过 500kB!');
                // }
                return isgeshi
                    // && isLt;
            },

            //放入页面中的图片
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //成功将url放入bannerarr里面
            handlesbannerSuccess(res) {
                this.bannerarr.push(res.imgURL);
                this.stayhomeform.sbanner = this.bannerarr.join(',');
            },
            //删除后在对应的数组里面删除
            handleRemove(file, fileList) {
                // console.log(file, fileList);
                fileList
                // console.log("删除后的");
                let url = file.response.imgURL;
                this.bannerarr = this.bannerarr.filter(ele => ele != url);
                this.stayhomeform.sbanner = this.bannerarr.join(',');

            },
            handlesbannerSuccess1(res) {
                this.bannerarr1.push(res.imgURL);
                this.stayhomeform.colors = this.bannerarr1.join(',');
            },
            //删除后在对应的数组里面删除
            handleRemove1(file, fileList) {
                // console.log(file, fileList);
                fileList
                // console.log("删除后的");
                let url = file.response.imgURL;
                this.bannerarr1 = this.bannerarr1.filter(ele => ele != url);
                this.stayhomeform.colors = this.bannerarr1.join(',');

            },
            handlesbannerSuccess2(res) {
                this.bannerarr2.push(res.imgURL);
                this.stayhomeform.desc = this.bannerarr2.join(',');
            },
            //删除后在对应的数组里面删除
            handleRemove2(file, fileList) {
                // console.log(file, fileList);
                fileList
                // console.log("删除后的");
                let url = file.response.imgURL;
                this.bannerarr2 = this.bannerarr.filter(ele => ele != url);
                console.log("bannerarr2",this.bannerarr2)
                this.stayhomeform.desc = this.bannerarr2.join(',');

            },
            //超出五个提示
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
                let url=URL +"api2/detail"
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