<template>
    <div class="left-nav">
<!--        <div @click="goIndex" style="width: 100%;text-align: center;color: #fff;padding: 20px;">首页</div>-->
        <ul class="navAsideTop"  @mouseleave.stop="navSubOut()">
            <li v-for="(navItem , index) in gNavList" >
                <div
                        @mouseenter="navSubIn(index)"
                        :class="navSubActive == index ? 'navActive' : ''"
                >
                    <i :class="navItem.icon" class="iconfont"></i>
                    {{navItem.name}}
                </div>

                <ul class="navSub" v-show="navSubActive == index">
                    <li v-for="(subItems,index2) in navItem.child"
                        @mouseenter="navSubIn(index)"
                        @click="navSubOut()"
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

</template>

<script>
    // import {recRegister} from "@/assets/js/api"

    import {mapStates,mapActions, mapGetters} from 'vuex'

    export default {
        name: "LeftNav",
        data() {
            return {

                isRouterAlive: true,   //控制视图是否显示的变量

                navSubActive:0,  //控制子导航显示的值 index
                navSubActive2:1,
                // 导航集合
                navList:[],

                HideNavStatus:false
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
            // recRegister().then(res=>{
            //     console.log(res);
            //     this.navArr=res;
            // });
        },
        computed:{
            // this.$store.StoreTagNav.state.navList,
            ...mapGetters('StoreTagNav',[ //用mapGetters来获取collection.js里面的getters
                'gState',
            ]),
            ...mapGetters('StoreTagNav',[ //用mapGetters来获取collection.js里面的getters
                'gNavList',
            ]),

        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/css/nav.scss";
</style>
