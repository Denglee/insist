<template>
    <keep-alive>
<!--        <iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->
    </keep-alive>
</template>

<script>
    export default {
        name: "publicIframe",   //firame
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
            let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath;
            console.log(nextUrl);
            this.localSrc = nextUrl;
        },

    }
</script>
