<template>
    <div class="btnNav-flex">
        <button class="btnNav-box" v-if="btnBack" @click="SecondBack">
            <i class="el-icon-back"></i>
            <span>返回</span>
        </button>

        <button class="btnNav-box" @click="btnAddRoyalty">
            <i class="iconfont icon-shuaxin"></i>
            <span>刷新</span>
        </button>
    </div>
</template>

<script>
    export default {
        inject: ['reLoad'], //注入依赖 App 中的reLoad方法
        name: "navRefush",   //刷新 + 返回
        props: {
            btnBack: {  //返回按钮是否显示  在一级导航不显示 默认不显示
                type: Boolean,
                default: true,
            },
            // pageName: {   //当前页面名称 name
            //     type: String,
            // }
        },
        data() {
            return {

            }
        },
        methods: {
            // 刷新
            btnAddRoyalty() {
                this.reLoad();
            },

            // 二级返回
            SecondBack(){
                this.$emit('SecondBack');
            },

        },
        created() {

        },
    }
</script>
