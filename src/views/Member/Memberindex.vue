<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <!--<publicIframe/>-->

        <!--<div>潜在会员</div>-->
        <iframe :src="localSrc" frameborder="0" id="iframe"></iframe>


    </div>
</template>

<script>
    export default {
        name: "Memberindex",
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
            console.log(this.$route.fullPath);*/

            let userId=this.$route.params.user_id;
            console.log(userId);
            if(!userId){
                userId = '';
            }
            let iframeUrl = this.localUrl + '/Admin' + this.$route.fullPath+'/user_id/'+userId+'.html';
            console.log(iframeUrl);

            this.localSrc = iframeUrl;

        },

    }
</script>
