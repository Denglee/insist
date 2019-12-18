<template>
    <div>
        <iframe :src="localSrc" frameborder="0" style="width: 100%;height: 800px;"></iframe>
    </div>
</template>

<script>
    export default {
        name: "publicIframe",
        data() {
            return{
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            console.log(this.$route);
            console.log(this.localUrl);
            console.log(this.$route.fullPath);
            console.log(this.localUrl + this.$route.fullPath);
            this.localSrc = this.localUrl + this.$route.fullPath;
        },
    }
</script>

<style scoped lang="scss">

</style>