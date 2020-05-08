<template>
    <div>

<!--        <el-upload-->
<!--                class="avatar-uploader"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :show-file-list="false"-->
<!--                :on-success="handleAvatarSuccess"-->
<!--                :before-upload="beforeAvatarUpload">-->
<!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--        </el-upload>-->


<!--        <el-checkbox-group v-model="hyzk2">-->
<!--            <el-checkbox v-for="(item,index) in hyzk1" :key="index" :label="item.name">-->
<!--                {{item.value}}-->
<!--            </el-checkbox>-->
<!--        </el-checkbox-group>-->


<!--        <el-button @click="submit">提交</el-button>-->

    </div>
</template>

<script>
    export default {
        name: "giftBag",
        data() {
            return {
                imageUrl: '',
                hyzk1: [
                    //3、婚姻状况
                    { id: "hyzk1", name: 1, value: "11" },
                    { id: "hyzk2", name: 2, value: "22" },
                    { id: "hyzk3", name: 3, value: "33" },
                    { id: "hyzk4", name: 4, value: "44" }
                ],
                hyzk:'',
                hyzk2:[],
                hj:'',

            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(res);
                console.log(file);
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                console.log(file);

                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            /*提交*/
            submit(){
              console.log(this.hyzk2);
            },
        },
        created() {

        },
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