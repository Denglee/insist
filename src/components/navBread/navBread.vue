<template>

    <div :class="bgGrayState == true ? 'bgGray' : '' ">
        <div class="btnNav-flex">
            <button class="btnNav-box" @click="$emit('GoBack')">
                <i class="el-icon-back"></i>
                <span>返回</span>
            </button>

            <button class="btnNav-box" @click="btnAddRoyalty">
                <i class="iconfont icon-shuaxin"></i>
                <span>刷新</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "navBread",   //面包屑导航
        inject: ['reLoad'], //注入依赖 App 中的reLoad方法
        props:{
            bgGrayState:{
                type:Boolean,
                default:true,
            }
        },
        data() {
            return {

            }
        },
        methods:{
            // 刷新
            btnAddRoyalty() {
                this.reLoad();
            },

        },

    }
</script>
<style scoped lang="scss">
    .bgGray{
        background-color: #eff2f9;
        width: 100%;
        padding-top: 30px;
        .btnNav-flex{
            margin-top: 0;
        }
    }
</style>
