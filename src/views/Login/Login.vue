<template>
    <div class="login-main">

        <div class="login-box">
            <img src="~@/assets/img/logo.png" alt="">
            <b>SAAS管理系统</b>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-ruleForm">
                <el-input
                        v-model="loginForm.username"
                        placeholder="账号">
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>

                <el-input v-model="loginForm.password"
                          placeholder="账号">
                    <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                </el-input>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                </el-form-item>

                <el-divider>第三方登录</el-divider>

                <img src="" alt="">

            </el-form>
        </div>
    </div>
</template>

<script>
    import {ApiloginIn,ApiloginOut} from '@/assets/js/api'
    import {mapState,mapActions, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                loginForm: {
                    username: 'admin',
                    password: 'zm#83221820',
                },
                loginRules: {
                    username: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                },
            }
        },
        computed: {
            /*       ...mapState({
                       lang: state => state.lang,
                       theme: state => state.theme
                   })*/
        },
        watch: {
            // "captcha.show"(val){
            //     this.loginRules.captcha[0].required = val
            // }
        },

        methods: {
            ...mapActions({
                ACTLogin:'StoreTagNav/ACTLogin',   //store里 login登录方法
                ACTlogout:'StoreTagNav/ACTlogout'   //store里 loginOut 退出登录方法
            }),

            /*提交*/
            submitForm(loginForm) {
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        console.log(valid);
                        let that=this;
                        let username = that.loginForm.username;
                        let password = that.loginForm.password;
                        ApiloginIn({
                            username:username,
                            password:password,
                        }).then(res=>{
                            console.log(res);
                            if(res.status == 1){
                                that.ACTLogin();
                                this.$message({
                                    message: '登录成功',
                                    type: 'success',
                                    duration:1500,
                                });
                                // setTimeout(()=>{
                                //     that.$router.push({path:'/index'});
                                // },1500)
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            /*提交*/
            submit() {
                let that=this;
                let username = that.username,
                    password = that.password;
                // console.log(username);
                // console.log(password);

                ApiloginIn({
                    username:username,
                    password:password,
                }).then(res=>{
                    console.log(res);
                    if(res.status == 1){
                        that.ACTLogin();
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration:1500,
                        });
                        // setTimeout(()=>{
                        //     that.$router.push({path:'/index'});
                        // },1500)
                    }
                });
            },

            loginOut() {
                let that = this;

                ApiloginOut().then(res =>{
                    console.log(res);
                    if(res.status == 1){
                        that.ACTlogout();
                    }
                }).catch(res => {
                    console.log(res);
                })
            },

        }
    }
</script>
<style lang="scss">
    .login-main{
        background: url('http://192.168.0.133:20000/statics/Admin/wxlogin/img/bg.jpg') no-repeat  50% 50%;
        background-size: cover;
        width: 100%;
        height: 100vh;
        position: relative;
        .login-box{
            position: absolute;
            right: 158px;
            top: 100px;
            /*top: calc(50vh - );*/
            width:300px;
            height:380px;
            background:rgba(39,61,89,1);
            box-shadow:-1px 2px 8px 0px rgba(12,22,36,0.79);
            opacity:0.82;
            border-radius:25px;
        }
    }
    .login {
        text-align: center;
    }

    .login input {
        display: block;
        border: solid 1px #ddd;
        border-radius: 4px;
        padding: 10px;
        width: 200px;
        margin: 20px auto 0;
    }

    .login button {
        display: block;
        border: solid 1px #ddd;
        border-radius: 4px;
        padding: 10px;
        width: 200px;
        margin: 20px auto 0;
    }

</style>
