<template>
    <header class="header-box">
        <nav class="header-nav">
            <div class="header-top">
                <img src="../assets/icon/ic_return.png" class="goBack" alt=""  @click='goBack' :noIndex='noIndex'>
                {{title}}
            </div>
        </nav>
    </header>
</template>

<script>
  export default {
    name: "topTabbar",
    data() {
      return {
        // noIndex:true,
      }
    },
    props:{
      "title":String,
      "noIndex":Boolean
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>

