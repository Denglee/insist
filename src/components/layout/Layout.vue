<template>
    <div class="layout-box">
        <el-row type="flex" class="row-bg" justify="space-between">
            <!--左侧侧边导航-->
            <el-col :span="2" class="layout-left">
                <LeftNav></LeftNav>
            </el-col>

            <!--右侧主体内容-->
            <el-col :span="22" class="layout-right">

                <!-- 头部v-once只渲染元素和组件一次，随后的渲染，使用了此指令的元素/组件及其所有的子节点，都会当作静态内容并跳过，这可以用于优化更新性能。-->
                <header-top  v-once />

                <!--左侧点击路由添加显示在头部导航-->
                <tag-nav></tag-nav>

                <router-view></router-view>

            </el-col>
        </el-row>

    </div>
</template>

<script>
    import HeaderBar from './HeaderBar'
    import HeaderTop from './HeaderTop'
    import LeftNav from './LeftNav'
    import TagNav from './TagNav'

    import {mapActions, mapGetters} from 'vuex'

    export default {
        data(){
            return{
                localUrl:this.GLOBAL.localUrl,
                dialogFormVisible:'false',
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        computed: {
            // ...mapGetters('StoreTagNav',[ //用mapGetters来获取collection.js里面的getters
            //     'gState',
            // ]),
            // tagNavList(){
            //
            //     // console.log(this.$store.state.tagNav.cachedPageName);
            //     // return this.$store.state.tagNav.cachedPageName
            // }
        },
        methods:{
            getGlobal(){
                console.log(this.localUrl);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            changePass(){

            }
        },
        created() {
          this.getGlobal();
        },
        components:{
            HeaderBar,
            HeaderTop,
            LeftNav,
            TagNav
        },

    }
</script>
<style lang="scss">
    @import "@/assets/css/LayoutNav.scss";
</style>
