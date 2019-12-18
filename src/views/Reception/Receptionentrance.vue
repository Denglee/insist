<template>
    <div class="box">
        <router-view></router-view>
<!--        <div>-->
<!--            <iframe src=" http://spt.zmtek.net/admin/reception/entrance/menuid/165.html" frameborder="0" style="width: 1700px;height: 800px;"></iframe>-->
<!--        </div>-->

        <publicIframe></publicIframe>

        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>

        <div class="left-nav">

           <el-menu default-active="1-4-1"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>

        </div>
<!--        <button @click="refresh()">刷新</button>-->
    </div>
</template>

<script>
    import {jianshen,jianshen2} from "../../assets/js/api"
    export default {
        name: "queryRec",
        // inject:['reload'],
        data() {
            return {
                isCollapse: true
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }

            // refresh(){
            //     this.reload();
            // },
        },
        created() {
            jianshen({
                city_id:'17',
                day:'2019-10-14',
            }).then(res=>{
                console.log(res);
            });
            jianshen2({
                city_id:'17',
                day:"2019-10-14",
                pid:"100"
            }).then(res=>{
                console.log(res);
            });
        }

    }
</script>

<style scoped>
    .box{
        width: 100%;
        height: 100vh;
        /*background-color: red;*/
    }

    .left-nav {

    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>