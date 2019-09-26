<template>
  <div id="app">
    <container></container>
<!--    <router-view/>-->
  </div>
</template>
<script>
  import container from '@/components/container.vue'
  export default {
    name:"App",
    data(){
      return {

      }
    },
    components: {container},
  }
</script>
<style lang="scss">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
