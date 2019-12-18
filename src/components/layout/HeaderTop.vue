<template>
    <div class="headerTop-box">
        <div class="headerTop-user">
            <!--头部搜索-->
            <el-form class="search-form">
                <el-input
                        placeholder="请输入姓名、卡号、会员卡号"
                        v-model="SearchVal">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-form>


            <!--头部用户信息+退出+更换密码-->
            <div class="headerTop-userInfo">
                <img class="userHeader" src="../../assets/img/userHeader.png" alt="">
                <el-menu class="el-menu-demo" mode="horizontal" >
                    <el-submenu index="2">
                        <template slot="title">用户名</template>
                        <el-menu-item index="2-1">
                            <el-button type="text" @click="dialogFormVisible = true">更换密码</el-button>
                        </el-menu-item>
                        <el-menu-item index="2-2">退出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>

        <!--更换密码弹出-->
        <el-dialog title="更换密码" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="旧密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name2" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "HeaderTop",
        data() {
            return {
                SearchVal:"",
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        methods: {

        },
        created() {

        },
    }
</script>

<style scoped lang="scss">

</style>