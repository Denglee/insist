<template>
    <div class="layoutLeft-nav">

        <el-menu default-active="1-1"
                 class="el-menu-vertical-demo"
                 :collapse="isCollapse"
                 background-color="#253954"
                 text-color="#fff"
                 active-text-color="#fff"
        >
            <el-submenu class="sunmenu-box" :index="index1 +''" v-for="(navItem , index1) in StateNavList.data"  :key="index1">
                <template slot="title">
                    <i class="iconfont el-icon-goods"></i>
                    <span slot="title">{{navItem.name}}</span>
                </template>

                <el-menu-item-group v-for="(subItems,index2) in (navItem.sub_menu)" :key="index2">
                    <el-menu-item :index="index1+'' +'-'+ index2+''" :dataIndex2="index1+'' +'-'+ index2+''">
                        <router-link :to="{path:'/'+subItems.controller+'/'+subItems.action}"
                                     :dataPath="subItems.controller+'/'+subItems.action">

                            {{subItems.name}}
                        </router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>

    </div>

</template>

<script>
    import {recRegister} from "@/assets/js/api"

    import {mapStates,mapActions, mapGetters} from 'vuex'

    export default {
        name: "LeftNav",
        data() {
            return {

                isCollapse: true,
                isRouterAlive: false,   //控制视图是否显示的变量

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


            // goNext(e){
            //     console.log(e);
            //     let trainerId = e.currentTarget.dataset.dataname;
            //     console.log(`${trainerId}`);
            //     this.$router.push({path:trainerId});
            // },

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

<style lang="scss">
    @import "@/assets/css/LayoutNav.scss";
</style>
