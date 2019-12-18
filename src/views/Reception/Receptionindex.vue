<template>
    <div class="box">
        <router-view></router-view>

        <publicIframe></publicIframe>

<!--        <div>-->
<!--            <iframe :src="localSrc" frameborder="0" style="width: 1700px;height: 800px;"></iframe>-->
<!--        </div>-->
<!--        <button @click="refresh()">刷新</button>-->
    </div>
</template>

<script>
    // import {recRegister} from '@/assets/js/api'
    export default {
        name: "Receptionindex",
        data(){
            return{
                // localUrl:this.GLOBAL.localUrl,
                // localSrc:"",
            }
        },

        methods:{

        },
        created() {
            // console.log(this.$route);
            // console.log(this.localUrl);
            // console.log(this.$route.fullPath);
            // console.log(this.localUrl + this.$route.fullPath);
            // this.localSrc = this.localUrl + this.$route.fullPath;
            // recRegister().then(res=>{
            //     console.log(res);
            // });
            // recRegister().then(res=>{
            //     console.log(res);
            // })
        }
    }
</script>

<style scoped>

</style>