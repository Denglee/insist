<template>
    <div class="headerTop-box">
        <div class="headerTop-user">
            <!--头部搜索-->
            <el-form class="search-form">
                <el-input

                        @blur="inpAdd()"
                        placeholder="请输入姓名、卡号、会员卡号"
                        v-model="SearchVal"
                        clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-form>

            <!--头部用户信息+退出+更换密码-->
            <div class="headerTop-userInfo">
                <img class="userHeader" src="~@/assets/img/userHeader.png" alt="">
                <el-dropdown>
                    <div class="el-dropdown-link">
                        <div class="userName">
                            {{StateUserName}}<i class="el-icon-caret-bottom"></i>
                        </div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">
                            <el-button type="text" @click="dialogFormVisible = true">更换密码</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item command="b">
                            <el-button type="text" @click="loginOut()">退出</el-button>
                        </el-dropdown-item>

                    </el-dropdown-menu>
                </el-dropdown>


               <!-- <el-menu class="el-menu-demo" mode="horizontal" >
                    <el-submenu index="2">
                        <template slot="title">用户名</template>
                        <el-menu-item index="2-1">
                            <el-button type="text" @click="dialogFormVisible = true">更换密码</el-button>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <el-button type="text" @click="loginOut()">退出</el-button>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>-->
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

    import {ApiloginOut} from '@/assets/js/api'

    import {mapState,mapActions, mapGetters} from 'vuex'

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
                formLabelWidth: '80px',
            }
        },
        methods: {

            /*退出登录*/
            loginOut(){
                let that = this;
                ApiloginOut().then(res=>{
                    console.log(res);
                    if(res.status == 1){
                        this.$message({
                            type:'success',
                            duration:1500,
                            message:"退出成功！",
                        });
                        setTimeout(()=>{
                            that.$router.push({path:'/login'})
                        },1500)

                    };

                })
            },

            /*搜索*/
            inpAdd(){
                let SearchVal=this.SearchVal;
                console.log(SearchVal);
                this.$router.push({path:'/Member/statistics'});
            }
        },
        computed: {
            // ...mapGetters('StoreTagNav',[ //用mapGetters来获取StoreTagNav.js里面的getters 的 gState
            //     'StateUserName',
            // ]),
            ...mapState({
                StateUserName:'StoreTagNav/StateUserName',
            }),
        },
    }
</script>
