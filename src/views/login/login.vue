<template>
    <div class="sys-login">
        <div class="login-area">
            <div class="logo">
                <!--<img src="/images/logo.png" alt="">-->
            </div>
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">

                    <!--用户名-->
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" placeholder="username" autocomplete="off"></el-input>
                    </el-form-item>

                    <!--密码-->
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="password" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-button @click="submitForm">立即登录</el-button>
                </el-form>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'


    export default {
        data() {
            return {
                loginForm: {
                    name: '',
                    password: '',
                },
                loginRules: {
                    name: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    password :[
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
        beforeMount(){
            // 初始化错误信息。保证单独点击input时可以弹出正确的错误提示
            this.setErrMsg()
        },
        methods: {
            ...mapActions('StoreTagNav',[ //用mapGetters来获取collection.js里面的getters
                'getNavList', 'aLogin',
            ]),
            // ...mapActions({
            //     login: 'auth/loginByEmail',
            //     loadLang: 'loadLang'
            // }),
            submitForm(){
                this.$refs.loginForm.validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        // this.$store.dispatch('StoreTagNav/aLogin',{
                        this.aLogin({
                            name: this.loginForm.name,
                            password: this.loginForm.password
                        }).then(res => {
                            // console.log(res)
                            if(res.login){
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
            setErrMsg(){
                console.log('14');
                // this.loginRules.name[0].message = this.global.errMsg.inputRequired;
                // this.loginRules.password[0].message = this.global.errMsg.inputRequired, {cont: this.global.password};
                // this.loginRules.captcha[0].message = this.global.errMsg.inputRequired, {cont: this.global.captcha};
            }
        }
    }
</script>
