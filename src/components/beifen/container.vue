<template>
    <div class="container">
        <el-row>
            <!--左边导航-->
            <el-col :span="4" class="navBox">
                <div @mouseleave.stop="navSubOut()" >
<!--                    <div @click="goIndex" style="width: 100%;text-align: center;color: #fff;padding: 20px;">首页</div>-->
                    <ul class="navAsideTop"  >
                        <li v-for="(navItem , index) in navArr" >
                            <div
                                    @mousemove="navSubIn(index)"
                                    :class="navSubActive == index ? 'navActive' : ''"
                            >
                                <i :class="navItem.icon" class="iconfont"></i>
                                {{navItem.name}}
                            </div>

                            <ul class="navSub" v-show="navSubActive == index">
                                <li v-for="(subItems,index2) in navItem.child"
                                    :class="navSubActive2 == index2 ? 'navActive' : ''">
                                    <router-link :to="subItems.path">
                                        <i :class="subItems.icon" class="iconfont"></i>
                                        {{subItems.name}}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </el-col>

            <!--右边主内容-->
            <el-col :span="20" class="right-main">
                <div class="right-top">

                </div>
                <router-view v-if="isRouterAlive"></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {recRegister} from "@/assets/js/api"
    export default {
        name: "container",
        data() {
            return {

                isRouterAlive: true,   //控制视图是否显示

                navSubActive:0,  //控制子导航显示的值 index
                navSubActive2:1,
                // 导航集合
                navArr:[],
                // navArr:[
                //     {
                //         title: "前台",
                //         icon: "icon-shouye2",
                //         sub_items: [{
                //             name: "会员登记",
                //             path: "/reception/register",
                //             icon: "icon-home"
                //         },
                //             {
                //                 name: "入场查询",
                //                 path: "/reception/query",
                //                 icon: "icon-home"
                //             }
                //         ],
                //     },
                //     {
                //         title: "会员",
                //         icon: "icon-vip2",
                //         sub_items: [{
                //             name: "正式会员",
                //             path: "/vip/officialVip",
                //             icon: "icon-user"
                //         },
                //         ],
                //
                //     },
                //     {
                //         title: "课程",
                //         icon: "icon-news_icon",
                //         sub_items: [{
                //             name: "私教",
                //             path: "/course/trainer",
                //             icon: "icon-user"
                //         },
                //             {
                //                 name: "团课",
                //                 path: "/course/group",
                //                 icon: "icon-user"
                //             },
                //         ],
                //     },
                //     {
                //         title: "合同",
                //         icon: "icon-shangwutubiao-",
                //         sub_items: [{
                //             name: "合同列表",
                //             path: "/statistics/contractList",
                //             icon: "icon-user"
                //         },
                //
                //         ],
                //
                //     },
                //     {
                //         title: "员工",
                //         icon: "icon-gerenzhongxin",
                //         sub_items: [{
                //             name: "员工列表",
                //             path: "/staff/staffList",
                //             icon: "icon-user"
                //         },
                //             {
                //                 name: "入场查询",
                //                 path: "/staff/staffQuery",
                //                 icon: "icon-user"
                //             },
                //         ],
                //
                //     }
                // ]
            };
        },

        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
            return {
                reload: this.reload
            }
        },
        methods: {
            // 刷新页面
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                });
            },

            goIndex(){
                const that=this;
                this.$router.push({path:'/index'});
            },


            // 鼠标移入 相应二级导航显示
            navSubIn(index){
                let that = this;
                console.log(index);
                that.navSubActive=index;
            },

            // 鼠标移出，隐藏二级导航
            navSubOut(){
                let that = this;
                // setTimeout(function(){
                //     that.navSubActive=-1;
                // },1000);
            },
        },

        created() {
            recRegister().then(res=>{
                console.log(res);
                this.navArr=res;
            });
        },
    };
</script>

<style scoped lang="scss">
    @import "../assets/css/nav.scss";
</style>
