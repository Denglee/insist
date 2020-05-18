<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <iframe :src="localSrc" frameborder="0" id="iframe" style=""></iframe>

    </div>
</template>

<script>
    export default {
        name: "Courseindex", //团课
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            let nextUrl = this.localUrl + '/Admin' + this.$route.fullPath+'?course_type=1';
            console.log(nextUrl);
            this.localSrc = nextUrl;
        },
    }
</script>
