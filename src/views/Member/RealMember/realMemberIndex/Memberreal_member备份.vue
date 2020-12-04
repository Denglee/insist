<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<div>正式会员</div>-->
        <iframe :src="localSrc" frameborder="0" id="iframe"></iframe>
    </div>
</template>

<script>
    export default {
        name: "Memberreal_member",
        data() {
            return {
                localUrl:this.GLOBAL.localUrl,
                localSrc:"",
            }
        },
        methods: {},
        created() {
            /*console.log(this.$route);
                       console.log(this.localUrl);
                       console.log(this.$route.fullPath); */
            let userId=this.$route.params.user_id;
            console.log(userId);
            let iframeUrl = '';
            if(!userId){
                iframeUrl = this.localUrl + '/Admin' + this.$route.fullPath+'/user_id/.html';
            }else{
                iframeUrl = this.localUrl + '/Admin' + this.$route.fullPath+'/user_id/'+userId+'.html';
            }
            console.log(iframeUrl);
            this.localSrc = iframeUrl;
        },
        watch: {
            '$route' (to, from) {
                console.log(from);
                this.$router.go(0);
            }
        },
    }
</script>
