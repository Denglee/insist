<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <publicIframe/>

        <!--<iframe :src="localSrc" frameborder="0" id="iframe"></iframe>-->

    </div>
</template>

<script>
    export default {
        name: "Memberhy_card", //期限合同
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath+'?course_type=2';
            console.log(nextUrl);
            // this.localSrc = nextUrl;
        },
    }
</script>

