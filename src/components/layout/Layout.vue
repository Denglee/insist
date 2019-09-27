<template>
    <div class="wrapper">

            <!--头部-->
            <!--v-once只渲染元素和组件一次，随后的渲染，使用了此指令的元素/组件及其所有的子节点，都会当作静态内容并跳过，这可以用于优化更新性能。-->
            <!--<header-bar v-once>-->
           <!-- <header-bar>
                <p slot="logo">VueJS模板系统</p>
            </header-bar>-->


        <div class="nav-main">
            <!--左侧导航-->
            <LeftNav></LeftNav>


            <!--右侧-->
            <div class="sys-content">
                <!--左侧点击路由添加显示在头部导航-->
<!--                <tag-nav></tag-nav>-->

                <!--主题内容  :include 缓存-->
                <keep-alive :include="tagNavList">
                    <router-view></router-view>
                </keep-alive>
            </div>



        </div>
    </div>
</template>

<script>
    import HeaderBar from './HeaderBar'
    import LeftNav from './LeftNav'
    import TagNav from './TagNav'

    import {mapActions, mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters('StoreTagNav',[ //用mapGetters来获取collection.js里面的getters
                'gState',
            ]),
            tagNavList(){

                // console.log(this.$store.state.tagNav.cachedPageName);
                // return this.$store.state.tagNav.cachedPageName
            }
        },
        components:{
            HeaderBar,
            LeftNav,
            TagNav
        },

    }
</script>
