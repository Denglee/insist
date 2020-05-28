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
        methods: {

        },
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

<style lang="scss">
    .icon_man{
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        i{
            color: #fff;
            font-size: 24px;
        }

    }
</style>
