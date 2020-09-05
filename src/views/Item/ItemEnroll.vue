<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->
        <div class="edit-container">

            <div class="btnTopBox">
                <button type="button" class="el-button btn-public" @click="btnText">
                     <span>文本</span>
                </button>
                <button type="button" class="el-button btn-public" @click="btnBG">
                     <span>背景</span>
                </button>
                <button type="button" class="el-button btn-public" @click="btnMusic">
                     <span>音乐</span>
                </button>
                <button type="button" class="el-button btn-public" @click="btnImage">
                     <span>图片</span>
                </button>
            </div>

            <div class="edit-box">

                <el-input type="text" v-model="form.inpArr[inpIndex]" v-for="(inpItem,inpIndex) in form.inpArr.value" :key="inpIndex"
                id="input-" placeholder="点击开始编辑"></el-input>

            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "ItemEnroll",  //活动报名
        data() {
            return {
                form:{
                    inpArr:[{
                        value:'',
                    }],
                }
            }
        },
        methods: {
            /*文本点击事件*/
            btnText(){
                this.form.inpArr.push({
                    value: '',
                    key: Date.now()
                })
            },

            /*背景点击事件*/
            btnBG(){

            },

            /*音乐点击事件*/
            btnMusic(){

            },

            /*图片点击事件*/
            btnImage(){

            },
        },
        created() {

        },
    }
</script>
<style lang="scss">
    @import "edit";
</style>

