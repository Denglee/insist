<template>
    <div class="login-main">
        <!--        <img src="https://swim.zmtek.net/assets/images/logo-dakaB.png" alt="" class="login-logo">-->
        <div class="login-box">
            <img src="https://swim.zmtek.net/assets/images/logo-daka.png" alt="" class="login-logo">
            <!--<img src="~@/assets/images/logo-daka.png" alt="" class="login-logo">-->

            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-ruleForm"
                     v-show="!LoginWechat">
                <div class="login-title">欢迎登陆</div>
                <el-form-item prop="username">
                    <el-input
                            v-model="loginForm.username"
                            placeholder="账号"
                            clearable>
                        <i slot="prefix" class="el-input__icon el-icon-user"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"
                              placeholder="账号"
                              type="password"
                              clearable
                              :show-password=true
                              @keyup.enter.native="submitForm('loginForm')">
                        <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
                    </el-input>
                </el-form-item>

                <el-button type="submit"  class="btnLogin" @click="submitForm('loginForm')"  :loading="loadState.searchLoad" >登录</el-button>

                <!--口碑不需要第三方登录-->
                <el-divider>第三方登录</el-divider>
                <img src="~@/assets/images/logo-wechat.png" alt="" class="logo-wechat" @click="goCodeLogin()">

            </el-form>

            <!--微信扫码登录-->
            <div class="login-wechat" v-if="LoginWechat">
                <!--                <img src="" alt="">-->
                <wxlogin :href="wx.href" :appid="wx.appid" :scope="wx.scope"
                         :redirect_uri="wx.redirect_uri" class="login-wechat"></wxlogin>
                <div class="LoginWechat-tip">
                    请使用微信扫描二维码登录
                    <br>
                    “健身房管理系统”
                </div>
                <el-button class="btnLogin btnLogin2" type="primary" @click="goCodeLogin()">返回账号密码登录</el-button>
            </div>

        </div>

        <!--验证码弹窗-->
        <el-popover
                popper-class="slidingPictures"
                ref="popover"
                trigger="manual"
                v-model="visible"
        >
            <div class="sliding-pictures">
                <div class="vimg">
                    <canvas id="sliderBlock"></canvas>
                    <canvas id="codeImg"></canvas>
                </div>
                <div class="slider">
                    <div class="track" :class="{ pintuTrue: puzzle }">
                        {{ tips }}
                    </div>
                    <div class="button el-icon-s-grid" @touchstart.prevent="dragM" id="btnShowM"></div>
                    <div class="button el-icon-s-grid" @mousedown.prevent="drag" id="btnShow"></div>
                </div>
                <div class="operation">
                   <span
                           title="关闭验证码"
                           @click="visible = false"
                           class="el-icon-circle-close"
                   ></span>
                    <span
                            title="刷新验证码"
                            @click="canvasInit"
                            class="el-icon-refresh-left"
                    ></span>
                </div>
            </div>
        </el-popover>

    </div>
</template>

<!--import configLogin from  '@/assets/js/configLogin.js'-->

<script>
    import {ApiloginIn} from '@/assets/js/api'
    import {mapActions} from 'vuex'

    import wxlogin from 'vue-wxlogin';

    let btnStatusLogin = true;   //按钮是否可点击状态

    export default {
        inject: ['reLoad'],
        data() {
            return {
                loadState: {  //按钮状态
                    searchLoad:false
                },
                /*登录参数*/
                wx: {
                    self_redirect: false,
                    id: "wxqrcode",
                    appid: "wx4e2180b044892be7",
                    scope: "snsapi_login",
                    redirect_uri: "http://spt.zmtek.net/Admin/login/authorization/type/2.html",
                    // state: state,
                    style: "black",
                    // href:'http://spt.zmtek.net/assets/css/Login.css',
                    href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9"
                },

                LoginWechat: false, //登录方式切换 显隐状态
                loginForm: {
                    username: '',
                    password: '',
                },
                loginRules: {  //验证规则
                    username: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                },

                tips: "拖动左边滑块完成上方拼图",

                visible: false,  //登录验证滑动框 显隐状态
                //滑块x轴数据
                slider: {
                    mx: 0,
                    bx: 0
                },
                //拼图是否正确
                puzzle: true,

            }
        },
        computed: {
            /*       ...mapState({
                       lang: state => state.lang,
                       theme: state => state.theme
                   })*/
        },
        watch: {
            visible(e) {
                if (e === true) {
                    this.canvasInit();
                    this.puzzle = false;
                }
            },

        },

        created() {
            // this.alertTip();
        },

        methods: {
            alertTip() {
                this.$alert("     <div class='alertTip-box'>\n" +
                    "            <div>疫情无情人有情，公司决定对所有用户延时一个季度的系统使用权，智迈科技与您一起共克艰难</div>\n" +
                    "            <div class='alertTip-sub'>[系统合同到期后，免费使用三个月。时间以合同到期日为准]</div>\n" +
                    "        </div>", {
                    dangerouslyUseHTMLString: true,
                    customClass:'tipBox',
                    confirmButtonText: '加油',
                }).then(() => {
                    this.$router.push({path: '/index'});
                }).catch(() => {
                    this.$router.push({path: '/index'});
                });
            },


            ...mapActions({
                ACTLogin: 'StoreTagNav/ACTLogin',   //store里 login登录方法 并 保存用户信息
            }),

            getStatus(urlStr) {
                var urlStrArr = urlStr.split('/');
                return urlStrArr[urlStrArr.length - 1]
            },

            /*二维码登录*/
            goCodeLogin() {
                this.LoginWechat = !this.LoginWechat;
                this.visible = false;
            },

            /*提交*/
            submitForm(loginForm) {
                let that = this;

                this.$refs[loginForm].validate((valid) => {

                    this.GLOBAL.btnStateChange(this,'loadState','searchLoad');

                    let that = this;
                    let username = that.loginForm.username;
                    let password = that.loginForm.password;
                    ApiloginIn({
                        username: username,
                        password: password,
                    }).then(res => {
                        console.log(res);
                        if (res.status == 1) {
                            let loginData = res.data;
                            console.log(loginData);
                            that.ACTLogin(loginData);
                            // this.$message({
                            //     message: res.info,
                            //     type: 'success',
                            //     duration: 1500,
                            //     offset: 100,
                            // });


                            this.alertTip();

                            return false;

                            setTimeout(() => {
                                /* this.$router.replace({
                                     path: "/redirect",
                                     query: {
                                         nextPath: '/index'
                                     }
                                 });*/
                                that.$router.push({path: '/index'});
                            }, 6000);

                        }
                        if (res.status == 0) {
                            this.$message({
                                message: res.info,
                                type: 'error',
                                duration: 3000,
                                offset: 40,
                            });
                        }
                    });

                    return  false;

                    if (valid && btnStatusLogin) {
                        this.tips = "拖动左边滑块完成上方拼图";
                        console.log(`${btnStatusLogin}`);
                        /*弹出验证框*/
                        this.visible = !this.visible;
                        btnStatusLogin = false;
                        setTimeout(() => {
                            btnStatusLogin = true;
                        }, 500);
                    } else {
                        console.error('登录提交失败!!');
                        return false;
                    }
                });
            },

            /*拼图验证码初始化*/
            canvasInit() {
                //生成指定区间的随机数
                const random = (min, max) => {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                //x: 254, y: 109
                let mx = random(100, 200),
                    bx = random(10, 100),
                    y = random(10, 99);
                this.slider = {mx, bx};
                this.draw(mx, bx, y);
            },

            /*手机端鼠标按下*/
            dragM(e) {
                console.log("鼠标按下", e);
                console.log(e);
                let dom = document.getElementById('btnShowM'); //dom元素
                let slider = document.querySelector("#sliderBlock"); //滑块dom
                const downCoordinate = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY};
                console.log(downCoordinate);
                //正确的滑块数据
                let checkx = Number(this.slider.mx) - Number(this.slider.bx);
                //x轴数据
                let x = 0;
                const move = moveEV => {
                    console.log(moveEV);
                    console.log(moveEV.changedTouches[0].clientX);
                    console.log(downCoordinate.x);
                    x = moveEV.changedTouches[0].clientX - downCoordinate.x;
                    console.log(x);
                    //y = moveEV.y - downCoordinate.y;
                    if (x >= 251 || x <= 0) return false;
                    dom.style.left = x + "px";
                    //dom.style.top = y + "px";
                    slider.style.left = x + "px";
                    // console.log( slider.style.left);
                };
                const up = () => {
                    console.log('up');
                    window.removeEventListener("touchmove", move);
                    window.removeEventListener("touchend", up);
                    dom.style.left = "";
                    let max = checkx + 5;  //最大值
                    let min = checkx - 17;  //最小值
                    console.log('x:' + x, 'checkx:' + checkx, 'max:' + max, 'min:' + min);
                    //允许正负误差1
                    if ((max >= x || x <= min) || x === checkx) {
                        console.log("滑动解锁成功");
                        this.puzzle = true;
                        this.tips = "验证成功";

                        // return false;

                        let that = this;
                        let username = that.loginForm.username;
                        let password = that.loginForm.password;
                        ApiloginIn({
                            username: username,
                            password: password,
                        }).then(res => {
                            console.log(res);
                            if (res.status == 1) {
                                let loginData = res.data;
                                console.log(loginData);
                                that.ACTLogin(loginData);
                                this.$message({
                                    message: res.info,
                                    type: 'success',
                                    duration: 1500,
                                    offset: 100,
                                });
                                // return false;
                                setTimeout(() => {
                                    /* this.$router.replace({
                                         path: "/redirect",
                                         query: {
                                             nextPath: '/index'
                                         }
                                     });*/
                                    that.$router.push({path: '/index'});
                                }, 1500);

                            }
                            if (res.status == 0) {
                                this.$message({
                                    message: res.info,
                                    type: 'error',
                                    duration: 3000,
                                    offset: 40,
                                });
                            }
                        });


                        setTimeout(() => {
                            this.visible = false;
                        }, 500);
                    } else {
                        console.log("拼图位置不正确");
                        this.tips = "验证失败，请重试";
                        this.puzzle = false;
                        this.canvasInit();
                    }
                };

                window.addEventListener("touchmove", move);
                window.addEventListener("touchend", up);
            },

            /*pc鼠标按下*/
            drag(e) {
                console.log("鼠标按下", e);
                let dom = e.target; //dom元素
                let slider = document.querySelector("#sliderBlock"); //滑块dom
                const downCoordinate = {x: e.x, y: e.y};
                //正确的滑块数据
                let checkx = Number(this.slider.mx) - Number(this.slider.bx);
                //x轴数据
                let x = 0;
                const move = moveEV => {
                    x = moveEV.x - downCoordinate.x;
                    //y = moveEV.y - downCoordinate.y;
                    if (x >= 251 || x <= 0) return false;
                    dom.style.left = x + "px";
                    //dom.style.top = y + "px";
                    slider.style.left = x + "px";
                };
                const up = () => {
                    document.removeEventListener("mousemove", move);
                    document.removeEventListener("mouseup", up);
                    dom.style.left = "";
                    let max = checkx + 5;  //最大值
                    let min = checkx - 17;  //最小值
                    console.log('x:' + x, 'checkx:' + checkx, 'max:' + max, 'min:' + min);
                    //允许正负误差1
                    if ((max >= x && x >= min) || x === checkx) {
                        console.log("滑动解锁成功");
                        this.puzzle = true;
                        this.tips = "验证成功";

                        // return false;

                        let that = this;
                        let username = that.loginForm.username;
                        let password = that.loginForm.password;
                        ApiloginIn({
                            username: username,
                            password: password,
                        }).then(res => {
                            console.log(res);
                            if (res.status == 1) {
                                let loginData = res.data;
                                console.log(loginData);
                                that.ACTLogin(loginData);
                                // this.$message({
                                //     message: res.info,
                                //     type: 'success',
                                //     duration: 1500,
                                //     offset: 100,
                                // });


                                this.alertTip();


                                setTimeout(() => {
                                    /* this.$router.replace({
                                         path: "/redirect",
                                         query: {
                                             nextPath: '/index'
                                         }
                                     });*/
                                    that.$router.push({path: '/index'});
                                }, 6000);

                            }
                            if (res.status == 0) {
                                this.$message({
                                    message: res.info,
                                    type: 'error',
                                    duration: 3000,
                                    offset: 40,
                                });
                            }
                        });


                        setTimeout(() => {
                            this.visible = false;
                        }, 500);
                    } else {
                        console.log("拼图位置不正确");
                        this.tips = "验证失败，请重试";
                        this.puzzle = false;
                        this.canvasInit();
                    }
                };
                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", up);
            },

            /*绘制*/
            draw(mx = 200, bx = 20, y = 50) {
                let mainDom = document.querySelector("#codeImg");
                let bg = mainDom.getContext("2d");
                let width = mainDom.width;
                let height = mainDom.height;
                let blockDom = document.querySelector("#sliderBlock");
                let block = blockDom.getContext("2d");
                //重新赋值，让canvas进行重新绘制
                blockDom.height = height;
                mainDom.height = height;

                /*绘图背景*/
                /*弹出 登录 cancas图片*/
                let imgBg1 = 'https://swim.zmtek.net/assets/images/loginImgBg1.jpg';
                let imgBg2 = 'https://swim.zmtek.net/assets/images/loginImgBg2.jpg';
                let imgBg3 = 'https://swim.zmtek.net/assets/images/loginImgBg3.jpg';
                let imgArr = [imgBg1, imgBg2, imgBg3,];
                var imgsrc = imgArr[Math.round(Math.random() * (imgArr.length - 1))];  //随机抽取一个值
                console.log(imgsrc);

                let img = document.createElement("img");
                img.style.objectFit = "scale-down";
                img.src = imgsrc;
                img.onload = function () {
                    bg.drawImage(img, 0, 0, width, height);
                    block.drawImage(img, 0, 0, width, height);
                };
                let mainxy = {x: mx, y: y, r: 9};
                let blockxy = {x: bx, y: y, r: 9};
                this.drawBlock(bg, mainxy, "fill");
                this.drawBlock(block, blockxy, "clip");
            },
            //绘制拼图
            drawBlock(ctx, xy = {x: 254, y: 109, r: 9}, type) {
                let x = xy.x,
                    y = xy.y,
                    r = xy.r,
                    w = 44;
                let PI = Math.PI;
                //绘制
                ctx.beginPath();
                //left
                ctx.moveTo(x, y);
                //top
                ctx.arc(x + (w + 5) / 2 + 6, y, r + 0.5, -PI, 0, true);

                ctx.lineTo(x + w + 14, y);     //A

                //right
                ctx.arc(x + w + 14, y + w / 2 - 5, r - 2, 1.5 * PI, 0.5 * PI, false);

                ctx.lineTo(x + w + 14, y + w - 10);   //B

                //bottom
                ctx.arc(x + (w + 5) / 2 + 4, y + w - 9, r, 0, PI, false);

                ctx.lineTo(x, y + w - 10);         //C

                ctx.arc(x, y + w / 2 - 5, r, 0.5 * PI, 1.5 * PI, true);

                ctx.lineTo(x, y);     //D

                //修饰，没有会看不出效果
                ctx.lineWidth = 3;
                ctx.fillStyle = "rgba(255, 255, 255, 1)";
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                ctx.stroke();
                ctx[type]();
                ctx.globalCompositeOperation = "xor";
            }

        },
        components: {
            wxlogin,
        }

    }
</script>
<style lang="scss">
    @import "@/assets/css/login.scss";
    .alertTip-box{
        font-size: 16px;
        color: #000;

    }
    .alertTip-sub{
        margin-top: 4px;
        color: #979797;
        font-size: 14px;
    }
</style>
