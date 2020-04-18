<script src="../../../test/riches/js/StaffIndex.js"></script>
<template>
    <div class="ebox">

        {{ msg }}
        <edit ref="editor"
            v-model="msg"
            :disabled="disabled"
            @onClick="onClick">
        </edit>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>




        <div>
            <!-- 单图片上传 -->
            <el-upload class="avatar-uploader" action="'string'"  list-type="picture"
                       :auto-upload="false"
                       :show-file-list="false"
                       :on-change="handleCrop" :http-request="upload">
                <i class="el-icon-plus avatar-uploader-icon"
                   :style="{width:width+'px',height:height+'px','line-height':height+'px','font-size':height/6+'px'}"></i>
            </el-upload>
            <div>
                <img v-if="imageUrl" :src="imageUrl" class="avatar" ref="singleImg">
            </div>

            <!-- 剪裁组件弹窗 -->
            <el-dialog :visible.sync="cropperModel" width="1100px" :before-close="beforeClose">
                <Cropper :img-file="file" ref="vueCropper" :fixedNumber="fixedNumber" @upload="upload">
                </Cropper>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import edit from '@/components/tinymce/tinymce'
    import Cropper from '@/components/cropper/cropper';

    export default {
        name: "editIndex",
        props: {
            targetUrl: {
                // 上传地址
                type: String,
                // default: '/storage/upload'
                default: `${process.env.API_ROOT}/sys/oss/upload`
            },

            initUrl: {
                // 初始图片链接
                default: ''
            },
            fixedNumber: {
                // 剪裁框比例设置
                default: function () {
                    return [1, 1];
                }
            },
            width: {
                // 单图剪裁框宽度
                type: Number,
                default: 178
            },
            height: {
                // 单图剪裁框高度
                type: Number,
                default: 178
            }
        },
        data() {
            return {
                msg: 'Welcome to Use Tinymce Editor',
                disabled: false,

                file: '', // 当前被选择的图片文件
                imageUrl: '', // 单图情况框内图片链接
                uploadList: [], // 上传图片列表
                dialogVisible: false, // 展示弹窗开关
                cropperModel: false, // 剪裁组件弹窗开关

            }
        },
        updated () {
            if (this.$refs.vueCropper) {
                this.$refs.vueCropper.Update();
            }
        },

        watch: {
            initUrl: function (val) {
                // 监听传入初始化图片
                // console.info('watch');
                if (val) {
                    if (typeof this.initUrl === 'string') {
                        this.imageUrl = val;
                    } else {
                        this.uploadList = this.formatImgArr(val);
                        // this.$emit('imgupload', this.uploadList);
                    }
                }
            }
        },
        mounted () {
            if (typeof this.initUrl === 'string') {
                this.imageUrl = this.initUrl;
            } else {
                this.uploadList = this.formatImgArr(this.initUrl);
            }
        },
        methods: {

            /** **************************** single单图情况 **************************************/
            handlePreviewSingle (file) { // 点击进行图片展示
                this.dialogImageUrl = this.file.url;
                this.dialogVisible = true;
            },


            beforeClose () {
                console.log(this.uploadList);
                this.cropperModel = false;
            },
            handleCrop (file, files) {
                // console.log(file);
                // 点击弹出剪裁框
                this.cropperModel = true;
                this.file = file;
                // this.imageUrl = file.url
            },
            /************************************************************************************/

            async upload (data) {
                console.log(data);
                event.preventDefault();

                this.imageUrl = data;
                // this.isDisabled = true;
                this.$refs.vueCropper.isDisabled = true;
                this.cropperModel = false;
                return  false;
            },

            // 鼠标单击的事件
            onClick (e, editor) {
                console.log('Element clicked');
                console.log(e);
                console.log(editor)
            },
            // 清空内容
            clear () {
                this.$refs.editor.clear()
            }
        },
        created() {

        },
        components:{
            edit,
            Cropper,
        }
    }
</script>

<style lang="scss">
    .ebox{
        width: 94%;
        margin: 20px auto;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        color: #8c939d;
        text-align: center;
    }
    .avatar {
        display: block;
    }
    .reupload {
        border-radius: 50%;
        position: absolute;
        color: #fff;
        background-color: #000000;
        opacity: 0.6;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }
    #uploadIcon{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }
</style>