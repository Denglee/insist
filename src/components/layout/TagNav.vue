.tag-nav<template>
    <div class="tag-nav">
<!--        {{openedPageList}}-->
<!--        <scroll-bar ref="scrollBar">-->
            <router-link ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''" v-for="(item, index) in openedPageList"
            :to="item.path" :key="index">
                {{item.name}}
                <span class='el-icon-close' @click.prevent.stop="closeTheTag(item, index)"></span>
            </router-link>
<!--        </scroll-bar>-->
    </div>
</template>

<script>
// import ScrollBar from 'sysComponents/ScrollBar'
import {mapState,mapActions, mapGetters} from 'vuex'
export default {
    data(){
        return {
            defaultPage: '/home'
        }
    },
    computed: {
        ...mapState('StoreActiveNav',[ //用mapGetters来获取collection.js里面的getters
            'openedPageList',
        ]),
        // tagNavList(){
        //     return this.$store.state.tagNav.openedPageList
        // }
    },
    mounted(){
        // 首次加载时将默认页面加入缓存
        this.addTagNav()
    },
    watch: {
        $route(){
            this.addTagNav();
            // this.scrollToCurTag()
        }
    },
    methods: {
        addTagNav(){
            // 如果需要缓存则必须使用组件自身的name，而不是router的name
            this.$store.commit("StoreActiveNav/addTagNav", {
                name: this.$router.getMatchedComponents()[1].name,
                path: this.$route.path,
                title: this.$route.meta.name
            })
        },
        isActive(item){
            return item.path === this.$route.path
        },
        closeTheTag(item, index){
            // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
            // 如果没有前一个Tag，则加载默认页面
            this.$store.commit("StoreActiveNav/removeTagNav", item)
            if(this.$route.path == item.path){
                if(index){
                    this.$router.push(this.tagNavList[index-1].path)
                } else {
                    this.$router.push(this.defaultPage)
                    if(this.$route.path == "/index"){
                        this.addTagNav()
                    }
                }
            } 
        },
        scrollToCurTag(){
            this.$nextTick(() =>{
                for (let item of this.$refs.tag) {
                    if (item.to === this.$route.path) {
                        this.$refs.scrollBar.scrollToCurTag(item.$el)
                        break
                    }
                }
            })
        }
    },
    // components: {ScrollBar}
}
</script>
<style scoped lang="scss">
    $white:#fff;
    $themeColor:#ffa300;
    .tag-nav{
        /*position: absolute;*/
        top: 0;
        width: 100%;
        height: 53px;
        padding: 10px;
        background: $white;
        border-bottom: 1px solid #ddd;
        box-shadow: 0 1px 2px #f2f2f2;
        box-sizing: border-box;
        .tag-nav-item{
            display: inline-block;
            position: relative;
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            margin-right: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #ddd;
            text-decoration: none;
            span{
                width: 16px;
                height: 16px;
                line-height: 16px;
                border-radius: 50%;
                text-align: center;
                vertical-align: middle;
                transition: all .3s ease;
                transform-origin: 100% 50%;
                font-size: 12px;
                color: $themeColor;
                &:before {
                    display: inline-block;
                }
                &:hover {
                    background-color: $themeColor;
                    color: $white;
                }
            }
            &.cur{
                background-color: $themeColor;
                color: $white;
                & span{
                    color: $white;
                    &:hover{
                        background-color: lighten($themeColor, 34%);
                        color: $themeColor;
                    }
                }
            }
        }
    }

</style>