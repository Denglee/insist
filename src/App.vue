<template>
  <div id="app">
    <!--<routerConfigure-view v-if="isRouterAlive" :key="key"/>-->
    <router-view v-if="isRouterAlive"></router-view>

  </div>
</template>

<style lang="scss">
  @import "//at.alicdn.com/t/font_1766146_2d9bvuo1bmd.css";  /* <i class="iconfont "></i> 记得加calss iconfont iconFont 图标样式  */
</style>

<script>
  export default {
    name:"App",
    /*声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载*/
    provide(){
      return{
        reLoad:this.reLoad,
      }
    },

    data(){
      return {
        isRouterAlive:true,
      }
    },
    computed: {
      /*key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      }*/
    },

    methods:{
      /*刷新方法*/
      reLoad(){
        this.isRouterAlive = false;
        this.$nextTick(()=>{
          this.isRouterAlive = true;
        })
      },
    },

    /*activated: function() {
      this.getCase();
    }*/
  }

  /*
  * App 页面申明
  * 其他页面使用：
  *inject:['reLoad'], //注入依赖 App 中的reLoad方法
  * methods:{
  * shuain:{
  * this.reLoad();  //直接调用就好
  * }
  * }
  * */
</script>

