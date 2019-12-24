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
                <img class="userHeader" :src='"http://spt.zmtek.net/"+UserInfo.logo' alt="">
                <el-dropdown>
                    <div class="el-dropdown-link">
                        <div class="userName">
                            {{UserInfo.username}}<i class="el-icon-caret-bottom"></i>
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

            </div>
        </div>

        <!--更换密码弹出-->
        <el-dialog title="更换密码" :visible.sync="dialogFormVisible">
            <el-form :model="changePassForm" status-icon :rules="changeRules" ref="changePassForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldPass">
                    <el-input type="password" v-model="changePassForm.oldPass" autocomplete="off"  clearable></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                    <el-input type="password" v-model="changePassForm.newPass" autocomplete="off"  clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="changePassForm.checkPass" autocomplete="off"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('changePassForm')">提交</el-button>
                    <el-button @click="resetForm('changePassForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>

    import {ApiloginOut,ApiChangePass} from '@/assets/js/api'

    import {mapState,mapActions, mapGetters} from 'vuex'
    let btnStateChange = true;  //修改密码按钮点击状态
    export default {
        /*在页面注入App.vue组件提供（provide）的 reload 依赖，在逻辑完成之后（删除或添加...）,
        直接this.reload()调用，即可刷新当前页面*/
        inject:['reLoad'], //注入依赖 App 中的reLoad方法
        name: "HeaderTop",
        data() {
            /*旧密码验证规则*/
            let validateOldPass= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('旧密码不能为空'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                }  else {
                    callback();
                }
            };
            /*新密码验证规则*/
            let validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('新密码不能为空'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                }  else {
                    callback();
                }
            };
            /*确认密码验证规则*/
            let validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value.length<=5){
                    callback(new Error('密码不能少于6位数'));
                } else if (value !== this.changePassForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                SearchVal:"",  //搜索框值
                dialogFormVisible: false,   //修改密码弹出框状态

                formLabelWidth: '80px',

                /*修改密码 form  changePassForm 对应v-model*/
                changePassForm: {
                    oldPass: '',
                    newPass:'',
                    checkPass: '',
                },
                /*修改密码 form  changeRules 对应 :rules*/
                changeRules: {
                    oldPass: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    newPass: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    checkPass: [  //确认密码
                        { validator: validateCheckPass, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            ...mapActions({
                ACTlogout:'StoreTagNav/ACTlogout',   //store里 loginOut 退出登录方法
                metUserInfo:'StoreTagNav/actUserInfo',
            }),

            /*退出登录*/
            loginOut(){
                let that = this;
                ApiloginOut().then(res=>{
                    console.log(res);
                    this.ACTlogout();
                    if(res.status == 1){
                        this.$message({
                            type:'success',
                            duration:1500,
                            message:"退出成功！",
                            offset:100,
                        });
                        setTimeout(()=>{
                            that.$router.push({path:'/login'})
                        },1500)
                    };
                })
            },

            /*搜索*/
            inpAdd(){
                let SearchVal = this.SearchVal;
                console.log(SearchVal);
                this.$router.push({path:'/Member/statistics'});
            },

            /*修改密码提交*/
            submitForm(changePassForm) {
                this.$refs[changePassForm].validate((valid) => {
                    if (valid && btnStateChange) {
                        console.log(btnStateChange);
                        btnStateChange = false;
                        setTimeout(()=>{
                            btnStateChange = true;
                        },1000);

                        let uid = this.UserInfo.uid;
                        let old_password = this.changePassForm.oldPass;
                        let new_password = this.changePassForm.newPass;
                        console.log(`${uid},${old_password},${new_password}`);
                        ApiChangePass({
                            uid:uid,
                            old_password:old_password,
                            new_password:new_password,
                        }).then(res =>{
                            if(res.status == 1){
                                this.$message({
                                    message: res.info,
                                    type: 'success',
                                    duration:1500,
                                    offset:100,
                                });
                                setTimeout(()=>{
                                    this.dialogFormVisible = false;
                                    /*刷新页面*/
                                    this.reLoad();
                                },1500)
                            }
                            if(res.status == 0){
                                this.$message({
                                    message: res.info,
                                    type: 'error',
                                    duration:3000,
                                    offset:40,
                                });
                            }
                        }).catch(res=>{
                            console.log(res);
                        })
                    } else {
                        console.error('确认密码提交失败!!');
                        return false;
                    }
                });
            },
            /*修改密码 重置*/
            resetForm(changePassForm) {
                this.$refs[changePassForm].resetFields();
            }
        },
        created() {
            this.metUserInfo();
            console.log(this.UserInfo);
        },
        computed: {
            ...mapGetters({
                UserInfo:'StoreTagNav/getsUserInfo'
            })
        },
    }
</script>
