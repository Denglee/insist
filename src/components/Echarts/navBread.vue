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

</style>