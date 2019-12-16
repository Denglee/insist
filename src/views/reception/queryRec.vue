<template>
    <div class="box">
        <router-view></router-view>

        <button @click="refresh()">刷新</button>
    </div>
</template>

<script>
    import {jianshen,jianshen2} from "../../assets/js/api"
    export default {
        name: "queryRec",
        // inject:['reload'],
        data(){
            return{

            }
        },
        methods:{
            // refresh(){
            //     this.reload();
            // },
        },
        created() {
            jianshen({
                city_id:'17',
                day:'2019-10-14',
            }).then(res=>{
                console.log(res);
            });
            jianshen2({
                city_id:'17',
                day:"2019-10-14",
                pid:"100"
            }).then(res=>{
                console.log(res);
            });
        }

    }
</script>

<style scoped>
    .box{
        width: 100%;
        height: 100vh;
        /*background-color: red;*/
    }
</style>