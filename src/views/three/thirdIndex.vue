<template>
    <div class="layout-container">
<!--        <y-header>-->
<!--            <div slot="nav"></div>-->
<!--        </y-header>-->
        <div class="w">
            <div class="content">
                <div class="account-sidebar">
                    <div class="gray-box ">
                        <div class="box-inner">
                            <ul class="account-nav">
                                <li v-for="(item,i) in nav" :key='i'>
                                    <a href="javascript:;">
                                        <div class="account-nav-primary" @click="tabPrimary(item)"
                                             :class="{active:item.isActive}">
                                            <span>{{item.name}}</span>
                                            <i class="el-icon-arrow-right"></i>
                                        </div>
                                    </a>
                                    <div v-if="item.secondNav==true">
                                        <ul class="account-nav-second" v-show="show">
                                            <li v-for="(itemT,j) in item.navSecond" :key='j'
                                                :class="{active:itemT.name===title}"
                                                @click="tabSecond(itemT)">
                                                <span>{{itemT.name}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="gray-box sidebar-bottom content-center">
                        <div class="img-code">
<!--                            <img src="../../assets/static/img-code.png" width="100"/>-->
                        </div>
                        <span>扫一扫下载APP</span>
                    </div>
                </div>
                <div class="account-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
<!--        <y-footer></y-footer>-->

        <div>{{gettersName}}</div>
        <div>{{gettersNum}}</div>

    </div>
</template>
<script>
    // import YFooter from '/common/footer'
    // import YHeader from '/common/header'
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "third",
        data() {
            return {
                show: true,
                title: '学院介绍',
                nav: [
                    {
                        name: '学院介绍',
                        isActive: false,
                        secondNav: true, // 是否存在二级菜单,true为存在
                        // path: 'background',
                        navSecond: [
                            {name: '创建背景', path: 'background'},
                            {name: '创建单位', path: 'unit'},
                            {name: '创建目的'},
                            {name: '管理单位'},
                            {name: '运行主体'}
                        ]
                    },
                    {name: '关于我们', path: 'aboutMe', isActive: false, secondNav: false}
                ]
            }
        },
        computed: {
    /*        ...mapGetters('collection',[ //用mapGetters来获取collection.js里面的getters
                'gettersName'
            ]),
            ...mapGetters('footerStatus',[ //用mapGetters来获取collection.js里面的getters
                'gettersNum',
            ]),*/
            ...mapGetters(['gettersName','gettersNum']) // 动态计算属性，相当于this.$store.getters.gettersName
        },
        methods: {
            tabSecond(e) {
                this.$router.push({path: '/college/' + e.path})
            },
            tabPrimary(e) {
                let path = this.$route.path.split('/')[2]
                if (e.secondNav) {
                    //   this.show = !this.show
                    if (path === 'aboutMe') {
                        this.$router.push({path: '/college/' + e.navSecond[0].path})
                    }
                } else {
                    this.$router.push({path: '/college/' + e.path})
                }
            }
        },
        created() {

        },



    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    /*@import "../../assets/style/mixin";*/

    .main {
        background: #fff;
        color: #000;
    }

    a {
        color: #000;
    }

    .w {
        padding-top: 40px;
    }

    .img-code {
        margin: 0px auto 12px;
    }

    .content {
        display: flex;
        height: 100%;
        font-size: 16px;
    }

    .sidebar-bottom {
        margin-top: 20px;
        padding: 16px;
    }

    .content-center {
        text-align: center;
    }

    .account-sidebar {
        width: 210px;
        border-radius: 6px;

        .account-nav {
            padding: 15px 0;

            .active {
                color: #0156AC;
            }

            .active a {
                color: #0156AC;
            }

            li:hover {
                a {
                    color: #0156AC;
                }
            }

            li {
                position: relative;
                line-height: 48px;

                .account-nav-primary {
                    padding: 0px 20px;
                    height: 48px;

                    span {
                        float: left;
                    }

                    i {
                        float: right;
                        line-height: 48px;
                        font-size: 14px;
                    }
                }

                .account-nav-second {
                    li {
                        list-style: disc;
                        list-style-position: inside;
                        height: 48px;
                        padding: 0 26px;
                        text-align: left;
                        color: #5B6976;
                        cursor: pointer;

                        span {
                            margin-left: -14px;
                            color: #A9B2BC;
                        }

                        &:hover {
                            color: #0156AC;

                            span {
                                color: #0156AC;
                            }
                        }
                    }

                    .active {
                        color: #0156AC;

                        span {
                            color: #0156AC;
                        }
                    }
                }

                a {
                    display: block;
                }

                &.current {
                    a {
                        position: relative;
                        z-index: 1;
                        height: 50px;
                        background-color: #98AFEE;
                        line-height: 50px;
                        color: #FFF;
                    }
                }
            }
        }
    }

    .account-content {
        margin-left: 24px;
        flex: 1;
    }
</style>
