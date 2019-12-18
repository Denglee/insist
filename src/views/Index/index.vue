<template>
    <div>
<!--        <iframe src="http://baijiahao.baidu.com/s?id=1646983528553035278&wfr=spider&for=pc" frameborder="0"></iframe>-->
    </div>
</template>

<script>

    import {recRegister} from "../../assets/js/api"
    import {mapState,mapActions, mapGetters} from 'vuex'

    export default {
        name: "index",
        data(){
            return{

            }
        },
        methods:{
            getIndex(){
                // recRegister({
                //
                // }).then((res) =>{
                //     console.log(res);
                // })
            }
        },
        created() {
            this.getIndex();
        },
        computed: {

        }
    }
</script>

<style scoped>
    iframe{
        width: 100%;
        min-height: 100vh;
    }
</style>