<template>
    <div>
        <el-breadcrumb separator="/" class="nav-bread">
            <el-breadcrumb-item >
                <span class="hover-bread" @click="$emit('GoBack')" >
                      <i class="el-icon-back"></i>{{ breadTitle }}
                </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ breadContent1 }}</el-breadcrumb-item>
            <!--<el-breadcrumb-item>{{ breadContent2 }}</el-breadcrumb-item>-->
        </el-breadcrumb>
    </div>
</template>

<script>
    import {t} from "element-ui/src/locale";

    export default {
        name: "navBread",
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
            return {}
        },
        methods: {},
        created() {

        },
    }
</script>

<style scoped lang="scss">
    /*面包屑 导航*/
    .nav-bread{
        line-height: inherit;
        padding:10px 20px;
        background-color: #fff;
        margin-top: 16px;
        .hover-bread{
            &:hover{
                cursor: pointer;
                color:#005AD4;
            }
        }
        .el-icon-back{
            background-color:  #253954;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            color: #fff;
            display: inherit;
            margin-right: 8px;
        }
    }

</style>