<template>
    <div>
    <div ref="edit"></div>
    </div>
</template>

<script>
    import E from "wangeditor"
    import {IMGURL, SUCCESS,URL} from "../../lib/base";
    SUCCESS

    export default {
        name: "RichText",
        props:{
            formfile:{
                type:String,
            },
            menus:{
                type: Array,
                default:function () {
                    return [
                        'head',  // 标题
                        'bold',  // 粗体
                        'fontSize',  // 字号
                        'fontName',  // 字体
                        'italic',  // 斜体
                        'underline',  // 下划线
                        'strikeThrough',  // 删除线
                        'foreColor',  // 文字颜色
                        'backColor',  // 背景颜色
                        'link',  // 插入链接
                        'list',  // 列表
                        'justify',  // 对齐方式
                        'quote',  // 引用
                        'emoticon',  // 表情
                        'image',  // 插入图片
                        'table',  // 表格
                        'video',  // 插入视频
                        'code',  // 插入代码
                        'undo',  // 撤销
                        'redo'  // 重复
                    ];

                }
            },
              formview:{
                type:String,

            }
        },
        data(){
            return{
                imgthumburl:URL+"admin/upload/index",
            }
        },
        methods:{
            initRichText(){
                let that=this;
                var editor2 = new E(this.$refs.edit)
                editor2.customConfig.onchange=(html)=>{
                    // that.stayhomeform.sdetail=html;  html ,
                    html , that,IMGURL
                 this.$emit("rich-change",html,this.formfile)
                }
                // console.log(this.menus);
                editor2.customConfig.menus = this.menus;
                editor2.customConfig.uploadImgServer = this.imgthumburl  // 上传图片到服务器
                editor2.customConfig.uploadImgHooks = {
                    customInsert: function (insertImg, result) {
                        var url =IMGURL+result.imgURL
                        insertImg(url)
                    }
                }

                editor2.customConfig.uploadFileName = 'file';

                editor2.create()
                this.formview&& editor2.txt.html(this.formview )
            }
        },
        mounted(){
            this.initRichText();
        }

    }
</script>

<style scoped>

</style>