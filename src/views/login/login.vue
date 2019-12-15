<template>
    <div class="sys-login">
        <div class="login-area">
            <div class="logo">
                <!--<img src="/images/logo.png" alt="">-->
            </div>
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px">
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" placeholder="username"></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="password"></el-input>
                    </el-form-item>

                    <el-form-item prop="captcha" v-if="captcha.show" class="captcha">
                        <img :src="captcha.src" alt="">
                        <el-input v-model="loginForm.captcha" type="text" :placeholder="captcha"></el-input>
                    </el-form-item>


<!--                    <el-button type="primary" icon="el-icon-search">搜索</el-button>-->
<!--&lt;!&ndash;                    <p class="textR">{{global.forgetPassword}}</p>&ndash;&gt;-->
<!--                    <el-button type="primary">默认按钮</el-button>-->
                    <a class="btn-login" type="primary" @click="submitForm()">locin</a>
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
                    captcha: '',
                },
                loginRules: {
                    name: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    password :[
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    captcha: [
                        {required: false, message: '', trigger: 'blur'}
                    ]
                },
                captcha: {
                    show: false,
                    src: ''
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
            ...mapActions({
                login: 'auth/loginByEmail',
                loadLang: 'loadLang'
            }),
            submitForm(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.login({
                            name: this.loginForm.name,
                            password: this.loginForm.password
                        }).then(res => {
                            if(res.login){
                                this.$router.push('index')
                            } else {
                                this.sysMsg = res.message;
                                this.captcha.show = true;
                                this.captcha.src = res.captcha;
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
                // this.loginRules.name[0].message = this.global.errMsg.inputRequired, {cont: this.global.username};
                // this.loginRules.password[0].message = this.global.errMsg.inputRequired, {cont: this.global.password};
                // this.loginRules.captcha[0].message = this.global.errMsg.inputRequired, {cont: this.global.captcha};
            }
        }
    }
</script>
