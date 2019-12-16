<template>
    <div class="wrapper">

            <!--头部-->
            <!--v-once只渲染元素和组件一次，随后的渲染，使用了此指令的元素/组件及其所有的子节点，都会当作静态内容并跳过，这可以用于优化更新性能。-->
            <!--<header-bar v-once>-->


<!--        <div class="nav-main">-->
            <!--左侧导航-->
            <LeftNav></LeftNav>


            <!--右侧-->
            <div class="sys-content">
<!--                <header-bar>-->
<!--                    <p slot="logo">VueJS模板系统</p>-->
<!--                    <p slot="topnav">made</p>-->
<!--                </header-bar>-->

                <!--左侧点击路由添加显示在头部导航-->
                <tag-nav></tag-nav>

                <!--主题内容  :include 缓存-->
            <!--    <keep-alive :include="StoreTagNav">
                    <router-view></router-view>
                </keep-alive>-->
                <router-view></router-view>
            </div>



<!--        </div>-->
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
<style scoped lang="scss">
    .wrapper{
        display: flex;
    }
    .left-nav{
        flex: 1;
        min-height: 100vh;
        /*border: solid 1px blue;*/

    }
    .sys-content{
        flex: 6;
        /*border: solid 1px red;*/
        box-sizing: border-box;
        min-height: 100vh;
    }
    .navAsideTop{
        li{
            text-align: center;
            height: 60px;
            line-height: 60px;
            position: relative;
        }
    }
</style>
