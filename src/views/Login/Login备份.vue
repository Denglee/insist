<template>
    <div class="sys-login">
        <div class="login-area">
            <div class="logo">
                <!--<img src="/images/logo.png" alt="">-->
            </div>

            <div class="login">
                <input name="username" placeholder="账号" type="text" v-model="username">
                <input name="password" placeholder="密码" type="text" v-model="password">
                <button @click="submit()" type="button">提交</button>
            </div>

            <button @click="loginOut" style="padding: 10px;">退出</button>

            <el-alert
                    title="成功提示的文案"
                    type="success"
                    v-show="alertSuccessTIp">
            </el-alert>

            <!--<div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">

                    &lt;!&ndash;用户名&ndash;&gt;
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" placeholder="username" autocomplete="off"></el-input>
                    </el-form-item>

                    &lt;!&ndash;密码&ndash;&gt;
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="password" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-button @click="submitForm">立即登录</el-button>
                </el-form>

            </div>-->
        </div>
    </div>
</template>

<script>
    import {ApiloginIn} from '@/assets/js/api'
    import {mapState,mapActions, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                username: 'admin',
                password: 'zm#83221820',
                alertSuccessTIp:false,

                loginForm: {
                    name: '',
                    password: '',
                },
                loginRules: {
                    name: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                },
                sysMsg: ''
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
        beforeMount() {
            // 初始化错误信息。保证单独点击input时可以弹出正确的错误提示
            this.setErrMsg()
        },
        methods: {
            ...mapActions({
                ACTLogin:'StoreTagNav/ACTLogin'
            }),
            // ...mapActions('StoreTagNav',[ //用mapGetters来获取collection.js里面的getters
            //
            //     'getNavList', 'aLogin',
            // ]),
            // ...mapActions({
            //     login: 'auth/loginByEmail',
            //     loadLang: 'loadLang'
            // }),
            submitForm() {
                this.$refs.loginForm.validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        // this.$store.dispatch('StoreTagNav/aLogin',{
                        this.aLogin({
                            name: this.loginForm.name,
                            password: this.loginForm.password
                        }).then(res => {
                            // console.log(res)
                            if (res.login) {
                                this.$router.push('index')
                            } else {
                                console.log('登录失败');
                            }
                        })
                    } else {
                        return false
                    }
                });
            },
            // changeLang(val){
            //     if(val == this.lang) return
            //     // 切换语言后重新加载语言包，并对重置登陆表单
            //     this.loadLang(val).then(() => {
            //         this.setErrMsg()
            //         this.$refs.loginForm.resetFields()
            //     })
            // },
            // changeTheme(val){
            //     if(val == this.lang) return
            //     setTheme(val)
            //     this.$store.commit("setThemeColor", val)
            // },
            setErrMsg() {
                // console.log('14');
                // this.loginRules.name[0].message = this.global.errMsg.inputRequired;
                // this.loginRules.password[0].message = this.global.errMsg.inputRequired, {cont: this.global.password};
                // this.loginRules.captcha[0].message = this.global.errMsg.inputRequired, {cont: this.global.captcha};
            },


            /*提交*/
            submit() {
                let that=this;
                let username = this.username,
                    password = this.password;
                console.log(username);
                console.log(password);
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
                        setTimeout(()=>{
                            that.$router.push({path:'/index'});
                        },1500)
                    }
                });
            },

            loginOut() {
                // 192.168.0.133:20000/admin/Test/login_out
                this.$axios.post('/admin/Test/login_out')
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

        }
    }
</script>
<style lang="scss">
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
