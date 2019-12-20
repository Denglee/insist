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

        methods: {
            ...mapActions({
                ACTLogin:'StoreTagNav/ACTLogin'
            }),


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
                        // this.$message({
                        //     message: '登录成功',
                        //     type: 'success',
                        //     duration:1500,
                        // });
                        // setTimeout(()=>{
                        //     that.$router.push({path:'/index'});
                        // },1500)
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
