<template>

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

<!--    <el-breadcrumb separator="/" class="nav-bread">-->
<!--        <el-breadcrumb-item >-->
<!--            <span class="hover-bread" @click="$emit('GoBack')" >-->
<!--                  <i class="el-icon-back"></i>{{ breadTitle }}-->
<!--            </span>-->
<!--        </el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>{{ breadContent1 }}</el-breadcrumb-item>-->
<!--        &lt;!&ndash;<el-breadcrumb-item>{{ breadContent2 }}</el-breadcrumb-item>&ndash;&gt;-->
<!--    </el-breadcrumb>-->

</template>

<script>
    import {t} from "element-ui/src/locale";

    export default {
        name: "navBread",   //面包屑导航
        inject: ['reLoad'], //注入依赖 App 中的reLoad方法
        props: {
            breadTitle: {
                type: String,
                default() {
                    return '首页';
                }
            },
            breadContent1:  {
                type: String,
                default() {
                    return '';
                }
            },
            breadContent2:  {
                type: String,
                default() {
                    return '';
                }
            }
        },
        data() {
            return {
                path:'',
            }
        },
        methods:{
            // 刷新
            btnAddRoyalty() {
                this.reLoad();
            },

            // 二级返回
           /* SecondBack(){
                this.$emit('SecondBack');
            },*/
        },

    }
</script>

<style scoped lang="scss">
    /*面包屑 导航*/
    .nav-bread{
        line-height: inherit;
        padding:10px 20px;
        background-color: #fff;
        /*margin-top: 16px;*/
        border-top: solid 16px #EFF2F9;
        .hover-bread{
            &:hover{
                cursor: pointer;
                color:#005AD4;
                .el-icon-back{
                    background-color:#005AD4 !important;
                }
            }
            .el-icon-back{
                background-color:  #253954;
                height: 24px;
                line-height: 24px;
                border-radius: 50%;
                color: #fff;
                display: inherit;
                margin-right: 5px;
            }
        }

    }

</style>