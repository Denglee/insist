<template>
    <div class="layoutR-contain animated fadeIn">
        <!--右边iframe-->
        <publicIframe/>
    </div>
</template>

<script>
    import {analyzeApi} from '@/assets/js/api' /*引用 会员总览 接口*/
    export default {
        name: "Statanalyze",  //业绩分析
        data() {
            return {

            }
        },
        methods: {
            getAnalyze() {
                analyzeApi({
                    zmtek_ver:2,
                }).then(res => {
                    console.log(res.data);
                }).catch(res => {
                    console.log(res);
                });
            },

        },
        created() {
            this.getAnalyze();
        },
    }
</script>

