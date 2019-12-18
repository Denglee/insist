<template>
    <div class="left-nav">
        <div @click="goIndex" style="width: 100%;text-align: center;padding: 20px;">首页</div>

<!--        {{StateNavList.data}}-->

        <ul class="navAsideTop"  @mouseleave.stop="navSubOut()">
            <li v-for="(navItem , index) in StateNavList.data" >
                <div
                        @mouseenter="navSubIn(index)"
                        :class="navSubActive == index ? 'navActive' : ''"
                >
                    <i :class="navItem.icon" class="iconfont"></i>
                    {{navItem.name}}
                </div>

                <ul class="navSub" v-show="navSubActive == index">
                    <!--<li>{{navItem.sub_menu}}</li>-->
                    <li v-for="(subItems,index2) in (navItem.sub_menu)"
                        @mouseenter="navSubIn(index)"
                        @click="navSubOut()"
                        :class="navSubActive2 == index2 ? 'navActive' : ''">
<!--                        <div dataUrl="{{}}">-->
<!--                            {{subItems.name}}-->

<!--                        </div>-->
<!--                        {{subItems.name}}-->
<!--                        <a href="http://192.168.0.133:20000/>-->
<!--                            -->
<!--                        </a>-->

<!--                        <router-link :to="{path:'http://192.168.0.133:20000'+'/'+subItems.app+'/'+subItems.controller+'/'+subItems.action}">-->
                        <router-link :to="{path:subItems.controller+'/'+subItems.action}">
                            <i :class="subItems.icon" class="iconfont"></i>
                            {{subItems.name}} {{subItems.controller}}/{{subItems.action}}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>

</template>

<script>
    import {recRegister} from "@/assets/js/api"

    import {mapStates,mapActions, mapGetters} from 'vuex'

    export default {
        name: "LeftNav",
        data() {
            return {

                isRouterAlive: true,   //控制视图是否显示的变量

                navSubActive:0,  //控制子导航显示的值 index
                navSubActive2:1,

                HideNavStatus:false
            };
        },

        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
            return {
                reload: this.reload
            }
        },

        methods: {

            //store 里 StoreTagNav中 actions 的getNavList方法  获取左侧路由导航
            ...mapActions({
                getNavList: "StoreTagNav/actNavList",
            }),


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

            // 相应二级导航显示
            navSubIn(index){
                let that = this;
                 that.HideNavStatus = false;
                if(!that.HideNavStatus){
                    that.navSubActive=index;
                }
            },

            // 隐藏二级导航
            navSubOut(){
                let that = this;
                that.HideNavStatus = true;
                setTimeout(function(){
                    if(that.HideNavStatus){
                        that.navSubActive=-1;
                    }
                },100);
            },

        },

        created() {
            // 调用 getNavList方法  获取路由
            this.getNavList();
        },
        computed:{
            //获取 store 中 StoreTagNav。js 的 gState 页面通过{{gState}}直接用
            ...mapGetters({
                gState: "StoreTagNav/gState",
                StateNavList: "StoreTagNav/getNavList",
            }),

        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/css/nav.scss";
</style>
